import { Module } from '@nestjs/common'
import { JogadorModule } from './jogador/jogador.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriasModule } from './categorias/categorias.module'
import { DesafiosModule } from './desafios/desafios.module'
import { ConfigModule } from '@nestjs/config'

@Module({
   
   imports: [
      JogadorModule,
      CategoriasModule,
      DesafiosModule,
      ConfigModule.forRoot({
         envFilePath: 'env.development',
      }),     
      MongooseModule.forRoot(
         process.env.MONGO_URI,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
             // useCreateIndex: true,
             //useFindAndModify: false,
         }
      ),
   ],
   controllers: [],
   providers: [],
})

export class AppModule {}
