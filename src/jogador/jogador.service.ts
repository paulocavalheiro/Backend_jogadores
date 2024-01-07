import {
   BadRequestException,
   Injectable,
   Logger,
   NotFoundException,
   Query,
} from '@nestjs/common'
import { JogadorCreateDto } from './dto/jogador-create.dto'
import { JogadorUpdateDto } from './dto/jogador-update.dto'
import { Jogador } from './interface/jogador.interface'
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

@Injectable()
export class JogadorService {
   constructor(
      @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
   ) {}

   async criarJogador(jogadorCreateDto: JogadorCreateDto): Promise<Jogador> {
      const { email } = jogadorCreateDto

      const jogadorCadastrado = await this.jogadorModel
         .findOne({ email })
         .exec()

      if (jogadorCadastrado) {
         throw new BadRequestException(
            `Jogador com email ${email} já possui cadastro.`
         )
      }
      const novoJogador = new this.jogadorModel(jogadorCreateDto)
      return await novoJogador.save()
   }

   async atualizarJogador(
      _id: string,
      jogadorUpdateDto: JogadorUpdateDto
   ): Promise<void> {
      const jogadorCadastrado = await this.jogadorModel.findOne({ _id }).exec()
      if (!jogadorCadastrado) {
         throw new NotFoundException(` Jogador com id ${_id} não encontrado.`)
      }
      await this.jogadorModel
         .findOneAndUpdate({ _id }, { $set: jogadorUpdateDto })
         .exec()
   }

   async listarJogadores(): Promise<Jogador[]> {
      return await this.jogadorModel.find().exec()
   }

   async buscarJogadorId(_id: string): Promise<Jogador> {
      const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
      if (!jogadorEncontrado) {
         throw new NotFoundException(`Jogador com id ${_id} não encontado.`)
      }
      return jogadorEncontrado
   }

   async deletarJogador(_id: string): Promise<any> {
      const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
      if (!jogadorEncontrado) {
         throw new NotFoundException(`Jogador com id ${_id} não encontado.`)
      }
      return await this.jogadorModel.deleteOne({ _id }).exec()
   }
}
