import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../Subscription/Subscription.entity';
import { SubscriptionModule } from '../Subscription/Subscription.module';
import { SubscriptionService } from '../Subscription/Subscription.service';
import { UserModule } from '../User/User.module';
import { UserService } from '../User/user.service';
import { ProfileController } from './profile.controller';
import { Profile } from './Profile.entity';
import { ProfileService } from './Profile.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, Subscription]),
        SubscriptionModule,
    ],
    controllers: [ProfileController],
    providers: [ProfileService, SubscriptionService],
    exports: [ProfileService],
})
export class ProfileModule {}
