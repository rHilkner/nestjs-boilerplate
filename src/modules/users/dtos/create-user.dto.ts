import { createZodDto } from 'nestjs-zod'
import { CreateUserDtoSchema } from '../../../../shared/dtos'

export class CreateUserDto extends createZodDto(CreateUserDtoSchema) {
}