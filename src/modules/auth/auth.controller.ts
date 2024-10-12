import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dtos/sign-up.dto'
import { LoginDto } from './dtos/login.dto'
import { AuthorizeRoles } from '../../base/guards/authorization.guard'
import { UserRole } from '../../../shared/enums'
import { ZodPipe } from '../../base/pipes/zod.pipe'
import { LoginDtoSchema, SignUpDtoSchema } from '../../../shared/dtos'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  async signUp(@Body(new ZodPipe(SignUpDtoSchema)) signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto)
  }

  @Post('login')
  async login(@Body(new ZodPipe(LoginDtoSchema)) loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @AuthorizeRoles([UserRole.CUSTOMER, UserRole.ADMIN])
  @Post('logout')
  async signOut() {
    return await this.authService.signOut()
  }
}
