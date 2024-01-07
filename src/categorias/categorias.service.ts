import {
   Injectable,
   BadRequestException,
   NotFoundException,
   Logger,
   InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Categoria } from './interface/categoria.interface'
import { Model } from 'mongoose'
import { CategoriaCreateDto } from './dto/categoria-create.dto'
import { CategoriaUpdateDto } from './dto/categoria-update.dto'
import { JogadorService } from 'src/jogador/jogador.service'

@Injectable()
export class CategoriasService {
   constructor(
      @InjectModel('Categoria')
      private readonly categoriaModel: Model<Categoria>,
      private readonly jogadorService: JogadorService
   ) {}

   async criarCategoria(
      categoriaCreateDto: CategoriaCreateDto
   ): Promise<Categoria> {
      const { categoria } = categoriaCreateDto

      const categoriaEncontrada = await this.categoriaModel
         .findOne({ categoria })
         .exec()

      if (categoriaEncontrada) {
         throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
      }

      const categoriaCriada = new this.categoriaModel(categoriaCreateDto)
      return await categoriaCriada.save()
   }

   async listarCategorias(): Promise<Array<Categoria>> {
      return await this.categoriaModel.find().populate('jogadores').exec()
   }

   async buscarCategoriaId(categoria: string): Promise<Categoria> {
      const categoriaEncontrada = await this.categoriaModel
         .findOne({ categoria })
         .exec()

      if (!categoriaEncontrada) {
         throw new NotFoundException(`Categoria ${categoria} não encontrada.`)
      }
      return categoriaEncontrada
   }

   async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {
      const jogadores = await this.jogadorService.listarJogadores()

      const jogadorFilter = jogadores.filter(
         (jogador) => jogador._id == idJogador
      )

      if (jogadorFilter.length == 0) {
         throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
      }

      return await this.categoriaModel
         .findOne()
         .where('jogadores')
         .in(idJogador)
         .exec()
   }

   async atualizarCategoria(
      categoria: string,
      categoriaUpdateDto: CategoriaUpdateDto
   ): Promise<void> {
      const categoriaEncontrada = await this.categoriaModel
         .findOne({ categoria })
         .exec()

      if (!categoriaEncontrada) {
         throw new NotFoundException(` Categoria ${categoria} não encontrada !`)
      }
      await this.categoriaModel
         .findOneAndUpdate({ categoria }, { $set: categoriaUpdateDto })
         .exec()
   }

   async vincularCategoriaJogador(params: string[]): Promise<void> {
      const categoria = params['categoria']
      const idJogador = params['idJogador']

      const categoriaEncontrada = await this.categoriaModel
         .findOne({ categoria })
         .exec()

      const jogadorCadastradoCategoria = await this.categoriaModel
         .find({ categoria })
         .where('jogadores')
         .in(idJogador)
         .exec()

      await this.jogadorService.buscarJogadorId(idJogador)

      if (!categoriaEncontrada) {
         throw new BadRequestException(`Categoria ${categoria} não cadastrada!`)
      }

      if (jogadorCadastradoCategoria.length > 0) {
         throw new BadRequestException(
            `Id jogador ${idJogador} já cadastrado nesta categoria.`
         )
      }

      categoriaEncontrada.jogadores.push(idJogador)
      await this.categoriaModel
         .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
         .exec()
   }
}
