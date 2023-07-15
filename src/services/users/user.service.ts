import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { UserRole } from '../../common/enums/user-role';
import { UpdateUserDto } from './dto/update-user.dto';
import { encrypt } from '../../common/libs/encrypt.util';

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
        const newUser = new User({
            email,
            passwordHash: await encrypt(password),
            role,
            currentUserId: this.request.user?.id as string | undefined,
        });
        return await this.userRepository.save(newUser);
    }

    async updateUser(dto: UpdateUserDto): Promise<User> {
        if (this.request.user.role !== UserRole.ADMIN && this.request.user.id !== dto.id) {
            throw new Error('You are not allowed to update this user');
        }
        const user = await this.userRepository.findOne({ where: { id: dto.id } });
        user.update({
            email: dto.email,
            role: dto.role,
            currentUserId: this.request.user?.id,
        });
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getCurrentUser(): Promise<User> {
        return await this.userRepository.findOne({ where: { id: this.request.user?.id } });
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
