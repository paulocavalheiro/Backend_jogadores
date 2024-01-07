import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JogadorModule } from 'src/jogador/jogador.module'
import { CategoriasController } from './categorias.controller'
import { CategoriasService } from './categorias.service'
import { CategoriaSchema } from './interface/categoria.schema'

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: 'Categoria', schema: CategoriaSchema },
      ]),
      JogadorModule,
   ],
   controllers: [CategoriasController],
   providers: [CategoriasService],
   exports: [CategoriasService],
})
export class CategoriasModule {}
