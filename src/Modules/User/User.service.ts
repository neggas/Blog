import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { ProfileService } from '../Profile/Profile.service';

export class UserService {
    constructor(
        private readonly profileService: ProfileService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async create({ profile, ...data }: Partial<User>): Promise<User> {
        const user = await this.userRepository.save(
            new User({ ...data, profile }),
        );
        return user;
    }
    async findOne(where: FindOneOptions<User>): Promise<User> {
        const user = await this.userRepository.findOne(where);
        if (!user)
            throw new NotFoundException(
                `There isn't any user with identifier: ${where}`,
            );
        return user;
    }
    async findOneWithProfile(id: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .where('user.id = :id', { id })

            .getOne();
        if (!user)
            throw new NotFoundException(
                `There isn't any user with identifier: ${id}`,
            );
        return user;
    }
    async updatePassword(id: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user)
            throw new NotFoundException(`There isn't any user with id: ${id}`);
        const _user = await this.userRepository.update(id, { password });
        return _user.raw[0];
    }
}
