import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApiSessionModule } from '../api-session/api-session.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        ApiSessionModule,
        ConfigModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
