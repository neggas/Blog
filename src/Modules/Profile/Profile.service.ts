import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Profile } from './Profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProfileCreateDTO } from './dto/Profile-create.dto';
import { SubscriptionService } from '../Subscription/Subscription.service';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/types/RequestWithUser';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService extends TypeOrmCrudService<Profile> {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        @Inject(REQUEST)
        private readonly request: RequestWithUser,
    ) {
        super(profileRepository);
    }
}
