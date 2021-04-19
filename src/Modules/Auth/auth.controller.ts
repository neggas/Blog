import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    Post,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Articles')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/register')
    register(
        @Body(ValidationPipe)
        credentials: RegisterDTO,
    ) {
        return this.authService.register(credentials);
    }
    @Post('/login')
    @HttpCode(200)
    login(
        @Body(ValidationPipe)
        credentials: LoginDTO,
    ) {
        return this.authService.login(credentials);
    }
}
