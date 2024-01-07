import { IsEmail, IsNotEmpty, Validator } from 'class-validator'

export class JogadorCreateDto {
   @IsNotEmpty()
   readonly telefone: string

   @IsEmail()
   readonly email: string

   @IsNotEmpty()
   readonly nome: string
}
