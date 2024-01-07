import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { JogadorController } from './jogador.controller'
import { JogadorService } from './jogador.service'
import { JogadorSchema } from './interface/jogador.schema'

@Module({
   imports: [
      MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
   ],
   controllers: [JogadorController],
   providers: [JogadorService],
   exports: [JogadorService],
})
export class JogadorModule {}
