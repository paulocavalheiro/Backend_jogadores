import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Post,
   Put,
   Query,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common'
import { JogadorCreateDto } from './dto/jogador-create.dto'
import { JogadorUpdateDto } from './dto/jogador-update.dto'
import { Jogador } from './interface/jogador.interface'
import { JogadorService } from './jogador.service'
import { ValidacaoParametros } from '../common/pipes/validacao-parametros.pipe'

@Controller('api/v1/jogador')
export class JogadorController {
   constructor(private readonly jogadorService: JogadorService) {}

   @Post()
   @UsePipes(new ValidationPipe({ transform: true }))
   async criarJogador(
      @Body() jogadorCreateDto: JogadorCreateDto
   ): Promise<Jogador> {
      return await this.jogadorService.criarJogador(jogadorCreateDto)
   }

   @Put('/:_id')
   @UsePipes(new ValidationPipe({ transform: true }))
   async atualizarJogador(
      @Body() jogadorUpdateDto: JogadorUpdateDto,
      @Param('_id', ValidacaoParametros) _id: string
   ) {
      await this.jogadorService.atualizarJogador(_id, jogadorUpdateDto)
   }

   @Get()
   async listarJogadores(): Promise<Jogador[]> {
      return await this.jogadorService.listarJogadores()
   }

   @Get('/:_id')
   async buscarJogadorId(
      @Param('_id', ValidacaoParametros) _id: string
   ): Promise<Jogador> {
      return await this.jogadorService.buscarJogadorId(_id)
   }

   @Delete('/:_id')
   async deletarJogador(
      @Param('_id', ValidacaoParametros) _id: string
   ): Promise<void> {
      this.jogadorService.deletarJogador(_id)
   }
}
