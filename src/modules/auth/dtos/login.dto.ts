import { createZodDto } from 'nestjs-zod'
import { LoginDtoSchema } from '../../../../shared/dtos'

export class LoginDto extends createZodDto(LoginDtoSchema) {
}