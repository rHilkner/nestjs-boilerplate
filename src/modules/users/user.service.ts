import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { UserRole } from '../../../shared/enums'
import { ApiExceptions } from '../../common/exceptions/api-exceptions'
import { RequestContext } from '../../common/types/request-context'
import { PrismaService } from '../prisma/prisma.service'
import { AppUserModel } from '@prisma/client'
import { ulid } from 'ulid'
import { CreateUserDTO, UpdateUserDTO } from '../../../shared/dtos/user-dtos'

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {
  }

  async getUserById(userId: string): Promise<AppUserModel | null> {
    return await this.prisma.appUserModel.findUnique({ where: { id: userId } })
  }

  async findByEmail(email: string): Promise<AppUserModel | null> {
    return await this.prisma.appUserModel.findUnique({ where: { email } })
  }

  async createUser(dto: CreateUserDTO): Promise<AppUserModel> {
    const user = await this.prisma.appUserModel.findUnique({ where: { email: dto.email, role: dto.role } })
    if (user) {
      throw ApiExceptions.ForbiddenException('User already exists', `User with email ${dto.email} and role ${dto.role} already exists`)
    }
    return await this.prisma.appUserModel.create({
      data: {
        id: ulid(),
        email: dto.email,
        role: dto.role,
        createdBy: this.request.raw.jwtData?.userId ?? '',
        updatedBy: this.request.raw.jwtData?.userId ?? '',
      },
    })
  }

  async updateUser(dto: UpdateUserDTO): Promise<AppUserModel> {
    const user = await this.prisma.appUserModel.findUnique({ where: { email: dto.email, role: dto.role } })

    if (!user) {
      throw ApiExceptions.NotFoundException(`User not found`, `User with email ${dto.email} and role ${dto.role} not found`)
    }

    if (this.request.raw.jwtData?.userRole !== UserRole.ADMIN && this.request.raw.jwtData?.userId !== user.id) {
      throw ApiExceptions.ForbiddenException(`You are not allowed to update this user`, `You are not allowed to update this user`)
    }

    user.email = dto.email
    user.role = dto.role

    return await this.prisma.appUserModel.update({ where: { id: user.id }, data: user })
  }

  async getAllUsers(page: number, limit: number): Promise<AppUserModel[]> {
    return await this.prisma.appUserModel.findMany({ skip: (page - 1) * limit, take: limit })
  }

  async getCurrentUser(): Promise<AppUserModel> {
    const user = await this.prisma.appUserModel.findUnique({ where: { id: this.request.raw.jwtData?.userId } })

    if (!user) {
      throw ApiExceptions.NotFoundException(`User not found`, `User with id ${this.request.raw.jwtData?.userId} not found`)
    }

    return user
  }

  async save(user: AppUserModel): Promise<AppUserModel> {
    return await this.prisma.appUserModel.update({ where: { id: user.id }, data: user })
  }
}
