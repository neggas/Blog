import { Controller, Patch } from '@nestjs/common';
import { SubscriptionService } from './Subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}
    /*    @Patch(':id') */
}
