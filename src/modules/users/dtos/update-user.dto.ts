import { createZodDto } from 'nestjs-zod'
import { UpdateUserDtoSchema } from '../../../../shared/dtos'

export class UpdateUserDto extends createZodDto(UpdateUserDtoSchema) {
}