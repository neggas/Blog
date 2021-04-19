import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../Profile/Profile.module';
import { User } from './User.entity';
import { UserService } from './User.service';
import { IsUserAlreadyExistConstraint } from './Validators/isUserAlreadyExists.validator';

@Module({
    imports: [ProfileModule, TypeOrmModule.forFeature([User])],
    providers: [UserService, IsUserAlreadyExistConstraint],
    exports: [UserService],
})
export class UserModule {}
