import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApiSession } from './api-session.model'
import { ApiSessionService } from './api-session.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([ApiSession]),
    ConfigModule,
  ],
  providers: [ApiSessionService],
  exports: [ApiSessionService],
})
export class ApiSessionModule {
}
