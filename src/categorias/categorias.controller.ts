import {
   Body,
   Controller,
   Get,
   Param,
   Post,
   Put,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common'
import { Validate } from 'class-validator'
import { CategoriasService } from './categorias.service'
import { CategoriaCreateDto } from './dto/categoria-create.dto'
import { CategoriaUpdateDto } from './dto/categoria-update.dto'
import { Categoria } from './interface/categoria.interface'

@Controller('api/v1/categorias')
export class CategoriasController {
   constructor(private readonly categoriasService: CategoriasService) {}

   @Post()
   @UsePipes(new ValidationPipe({ transform: true }))
   async criarCategoria(
      @Body() categoriaCreateDto: CategoriaCreateDto
   ): Promise<Categoria> {
      return await this.categoriasService.criarCategoria(categoriaCreateDto)
   }

   @Get()
   async listarCategorias(): Promise<Array<Categoria>> {
      return await this.categoriasService.listarCategorias()
   }

   @Get('/:categoria')
   async buscarCategoriaId(
      @Param('categoria') categoria: string
   ): Promise<Categoria> {
      return await this.categoriasService.buscarCategoriaId(categoria)
   }

   @Put('/:categoria')
   @UsePipes(new ValidationPipe({ transform: true }))
   async atualizarCategoria(
      @Body() categoriaUpdateDto: CategoriaUpdateDto,
      @Param('categoria') categoria: string
   ): Promise<void> {
      await this.categoriasService.atualizarCategoria(
         categoria,
         categoriaUpdateDto
      )
   }

   @Post('/:categoria/jogadores/:idJogador')
   async vincularCategoriaJogador(@Param() params: string[]): Promise<void> {
      return await this.categoriasService.vincularCategoriaJogador(params)
   }
}
