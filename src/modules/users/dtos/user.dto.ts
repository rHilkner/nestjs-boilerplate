import { createZodDto } from 'nestjs-zod'
import { UserDtoSchema } from '../../../../shared/dtos'

export class UserDto extends createZodDto(UserDtoSchema) {
}