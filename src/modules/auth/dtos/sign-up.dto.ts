import { createZodDto } from 'nestjs-zod'
import { SignUpDtoSchema } from '../../../../shared/dtos'

export class SignUpDto extends createZodDto(SignUpDtoSchema) {
}