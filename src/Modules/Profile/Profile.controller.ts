import {
    Controller,
    UseGuards,
    Get,
    UseInterceptors,
    ClassSerializerInterceptor,
    Param,
    Patch,
    ParseIntPipe,
} from '@nestjs/common';

import { JWTAuthGuard } from '../Auth/guards/jwt-auth.guard';
import { User } from '../User/User.entity';

import { User as UserDecorator } from '../User/User.decorator';
import { ProfileService } from './Profile.service';
import { Profile } from './Profile.entity';
import { SubscriptionService } from '../Subscription/Subscription.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
@Crud({
    model: {
        type: Profile,
    },
})
@UseGuards(JWTAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
@ApiTags('Profiles')
export class ProfileController implements CrudController<Profile> {
    constructor(
        public readonly service: ProfileService,
        public readonly subscriptionService: SubscriptionService,
    ) {} /* 
    @Get('me')
    getMe(): Promise<Profile> {} */

    @Get('follow/:id')
    followUser(@Param('id', ParseIntPipe) id: number) {
        return this.subscriptionService.followUser(id);
    }
    @Get(':id/followers')
    getFollowers(@Param('id', ParseIntPipe) id: number) {
        return this.subscriptionService.findUserFollowers(id);
    }
    @Get(':id/followings')
    getFollowings(@Param('id', ParseIntPipe) id: number) {
        return this.subscriptionService.findUserFollowings(id);
    }
}
