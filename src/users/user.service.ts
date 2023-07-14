import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUserById(userId: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id: userId } });
    }
}
