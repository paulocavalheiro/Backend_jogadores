import { IsEmail, IsNotEmpty, Validator } from 'class-validator'

export class JogadorUpdateDto {
   @IsNotEmpty()
   readonly telefone: string

   @IsNotEmpty()
   readonly nome: string
}
