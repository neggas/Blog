import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './Subscription.controller';

import { Subscription } from './Subscription.entity';
import { SubscriptionService } from './Subscription.service';

@Module({
    imports: [TypeOrmModule.forFeature([Subscription])],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
    controllers: [SubscriptionController],
})
export class SubscriptionModule {}
