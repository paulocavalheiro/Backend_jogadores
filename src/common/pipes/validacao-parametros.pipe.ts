import {
   ArgumentMetadata,
   BadRequestException,
   PipeTransform,
} from '@nestjs/common'

export class ValidacaoParametros implements PipeTransform {
   transform(value: any, metadata: ArgumentMetadata) {
      if (!value) {
         throw new BadRequestException(
            `Parametro ${metadata.data}, não pode ser vazio.`
         )
      }
      return value
   }
}
