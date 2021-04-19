import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/Modules/User/User.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.APP_SECRET,
            signOptions: {
                expiresIn: '1d',
                algorithm: 'HS384',
            },
            verifyOptions: {
                algorithms: ['HS384'],
            },
        }),
    ],
    providers: [JwtStrategy, AuthService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
