import {
   ArrayMinSize,
   IsArray,
   IsEmail,
   IsNotEmpty,
   IsOptional,
   IsString,
   Validator,
} from 'class-validator'
import { Evento } from '../interface/categoria.interface'

export class CategoriaUpdateDto {
   @IsString()
   @IsNotEmpty()
   descricao: string

   @IsArray()
   @ArrayMinSize(1)
   eventos: Array<Evento>
}
