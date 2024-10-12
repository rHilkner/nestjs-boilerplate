import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthorizeRoles } from '../../base/guards/authorization.guard'
import { UserRole } from '../../../shared/enums'
import { ZodPipe } from '../../base/pipes/zod.pipe'
import { LoginDTO, LoginDtoSchema } from '../../../shared/dtos/user-dtos'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body(new ZodPipe(LoginDtoSchema)) loginDto: LoginDTO) {
    return await this.authService.login(loginDto)
  }

  @AuthorizeRoles([UserRole.CUSTOMER, UserRole.ADMIN])
  @Post('logout')
  async signOut() {
    return await this.authService.signOut()
  }
}
