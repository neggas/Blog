import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../User/User.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../User/user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(signUp: RegisterDTO): Promise<User> {
        const user = await this.userService.create(signUp);

        return user;
    }

    async login({ email, password }: LoginDTO): Promise<User> {
        let user: User;

        try {
            user = await this.userService.findOne({ where: { email } });
        } catch (err) {
            throw new UnauthorizedException(
                `There isn't any user with email: ${email}`,
            );
        }

        if (!(await user.compareWithHashedPassword(password))) {
            throw new UnauthorizedException(
                `Wrong password for user with email: ${email}`,
            );
        }
        user.token = this.signToken(user);
        return user;
    }

    async verifyPayload(payload: JwtPayload): Promise<User> {
        let user: User;

        try {
            user = await this.userService.findOneWithProfile(payload.sub.id);
        } catch (error) {
            throw new UnauthorizedException(
                `There isn't any user with email: ${payload.sub.email}`,
            );
        }
        return user;
    }

    signToken(user: User): string {
        const payload = {
            sub: {
                email: user.email,
                id: user.id,
            },
        };
        return this.jwtService.sign(payload);
    }
}
