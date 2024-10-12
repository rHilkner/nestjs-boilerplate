import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CallLogModel } from '@prisma/client'

@Injectable()
export class CallLogService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  save(sysCallLog: CallLogModel) {
    return this.prisma.callLogModel.create({ data: sysCallLog })
  }

}
