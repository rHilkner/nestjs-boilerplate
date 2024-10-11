import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CallLog } from '../modules/call-log/call-log.model'
import { ErrorLog } from '../modules/error-log/error-log.model'
import { ApiSession } from '../modules/api-session/api-session.model'
import { User } from '../modules/users/user.model'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { env_vars } from '../base/env_vars'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: env_vars.DB_HOST,
        port: env_vars.DB_PORT,
        username: env_vars.DB_USERNAME,
        password: env_vars.DB_PASSWORD,
        database: env_vars.DB_DATABASE,
        schema: env_vars.DB_SCHEMA,
        entities: [CallLog, ErrorLog, ApiSession, User],
        synchronize: true,
      }),
    }),
  ],
})
export class PostgresModule {
}
