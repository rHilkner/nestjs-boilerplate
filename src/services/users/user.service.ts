import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../../common/enums/user-role';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(REQUEST) private readonly request: any,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
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
            passwordHash: await this.authService.encodePassword(password),
            role,
            currentUserId: this.request.user?.id as string | undefined,
        });
        return await this.userRepository.save(newUser);
    }

    async updateUser(dto: UpdateUserDto): Promise<User> {
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
}
