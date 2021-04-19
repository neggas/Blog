import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { ArticleModule } from './Modules/Article/Article.module';
import { AuthModule } from './Modules/Auth/auth.module';
import { ProfileModule } from './Modules/Profile/Profile.module';
import { SubscriptionModule } from './Modules/Subscription/Subscription.module';
import { UserModule } from './Modules/User/User.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(ConfigService.getInstance().getTypeOrmConfig()),
        SubscriptionModule,
        AuthModule,
        ProfileModule,
        UserModule,
        ArticleModule,
    ],
})
export class AppModule {}
