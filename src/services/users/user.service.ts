import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { UserRole } from '../../common/enums/user-role';
import { UpdateUserDto } from './dtos/update-user.dto';
import { encrypt } from '../../common/libs/encrypt.util';
import { ApiExceptions } from '../../common/exceptions/api-exceptions';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(REQUEST) private readonly request: any,
    ) {}

    async getUserById(userId: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id: userId } });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async createUser(email: string, password: string, role: UserRole): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email, role } });
        if (user) {
            throw ApiExceptions.ForbiddenException('User already exists', `User with email ${email} and role ${role} already exists`);
        }
        const newUser = new User({
            email,
            passwordHash: await encrypt(password),
            role,
            currentUserId: this.request.user?.id as string | undefined,
        });
        return await this.userRepository.save(newUser);
    }

    async updateUser(dto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: dto.email, role: dto.role } });
        if (this.request.user.role !== UserRole.ADMIN && this.request.user.id !== user.id) {
            throw ApiExceptions.ForbiddenException(`You are not allowed to update this user`, `You are not allowed to update this user`);
        }
        user.update({
            email: dto.email,
            role: dto.role,
            currentUserId: this.request.user?.id,
        });
        return await this.userRepository.save(user);
    }

    async getAllUsers(page: number, limit: number): Promise<User[]> {
        return await this.userRepository.find({ skip: page * limit, take: limit });
    }

    async getCurrentUser(): Promise<User> {
        return await this.userRepository.findOne({ where: { id: this.request.user?.id } });
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
