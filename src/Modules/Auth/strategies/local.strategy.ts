import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passReqToCallback: false,
        });
    }

    validate(credentials: LoginDTO): Promise<User> {
        return this.authService.login(credentials);
    }
}
