import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallLog } from '../services/call-log/call-log.model';
import { ErrorLog } from '../services/error-log/error-log.model';
import { ApiSession } from '../services/api-session/api-session.model';
import { User } from '../services/users/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                schema: configService.get<string>('DB_SCHEMA'),
                entities: [CallLog, ErrorLog, ApiSession, User],
                synchronize: true,
            }),
        }),
    ],
})
export class PostgresModule {}
