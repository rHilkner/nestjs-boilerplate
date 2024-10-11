import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { LoginDto } from './dtos/login.dto';
import { Roles } from '../../base/guards/roles.guard';
import { UserRole } from '../../common/enums/user-role';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @Post('logout')
    async signOut() {
        return await this.authService.signOut();
    }
}
