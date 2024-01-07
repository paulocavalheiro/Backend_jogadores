import { Module } from '@nestjs/common'
import { DesafiosController } from './desafios.controller'
import { DesafiosService } from './desafios.service'
import { MongooseModule } from '@nestjs/mongoose'
import { DesafioSchema } from './interfaces/desafio.schema'
import { PartidaSchema } from './interfaces/partida.schema'
import { JogadorModule } from 'src/jogador/jogador.module'
import { CategoriasModule } from 'src/categorias/categorias.module'

/*
Desafio
*/

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: 'Desafio', schema: DesafioSchema },
         { name: 'Partida', schema: PartidaSchema },
      ]),
      JogadorModule,
      CategoriasModule,
   ],
   controllers: [DesafiosController],
   providers: [DesafiosService],
})
export class DesafiosModule {}
