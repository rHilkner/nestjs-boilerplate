import { Module } from '@nestjs/common'
import { ApiSessionService } from './api-session.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
  ],
  providers: [ApiSessionService],
  exports: [ApiSessionService],
})
export class ApiSessionModule {
}
