import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Status, Subscription } from './Subscription.entity';
import { RequestWithUser } from 'src/types/RequestWithUser';
import { Profile } from '../Profile/Profile.entity';

@Injectable({
    scope: Scope.REQUEST,
})
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
        @Inject(REQUEST)
        private readonly request: RequestWithUser,
    ) {}
    async followUser(followingId: number) {
        const { id: followerId, subscriptions } = this.request.user.profile;
        if (subscriptions)
            if (
                subscriptions?.findIndex(
                    ({ subscribedTo }) => subscribedTo.id !== followingId,
                ) !== -1
            )
                return 'You already sent a request';
        const subscription = new Subscription({
            subscribedToId: followerId,
            subscriberId: followingId,
            status: Status.pending,
        });
        await this.subscriptionRepository.save(subscription);
        return true;
    }
    async acceptFollowing(subscriberId: number) {
        const { id: subscribedToId } = this.request.user.profile;
        const subscription = await this.subscriptionRepository.findOne({
            where: {
                subscriberId,
                subscribedToId,
            },
        });
        subscription.status = Status.accepted;
        await subscription.save();
        return subscription;
    }
    async findUserFollowings(id: number, status: Status = Status.accepted) {
        return await this.subscriptionRepository
            .createQueryBuilder('subscription')
            .leftJoinAndSelect('subscription.subscribedTo', 'profile')
            .where('subscription.subscriberId = :id', { id })
            .andWhere('subscription.status = :status', {
                status,
            })
            .getMany();
    }
    async findUserBlacklist(id: number) {
        return await this.findUserFollowings(id, Status.blocked);
    }
    async findUserFollowers(id: number, status = Status.accepted) {
        return await this.subscriptionRepository
            .createQueryBuilder('subscription')
            .leftJoinAndSelect('subscription.subscriber', 'profile')
            .where('subscription.subscribedToId = :id', { id })
            .andWhere('subscription.status = :status', {
                status,
            })
            .getMany();
    }
}
