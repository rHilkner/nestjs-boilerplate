import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { ApiSessionModule } from '../api-session/api-session.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ApiSessionModule,
        ConfigModule,
        forwardRef(() => UserModule),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
