import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { LoginDTO } from './login.dto';
import { Match } from '../Validators/Match.cv';
import { ApiProperty } from '@nestjs/swagger';
import { IsUserAlreadyExist } from 'src/Modules/User/Validators/isUserAlreadyExists.validator';

export class RegisterDTO {
    @IsUserAlreadyExist()
    @IsEmail(
        {},
        {
            message: 'This is not a valid email',
        },
    )
    @IsNotEmpty({
        message: "You can't register without an email",
    })
    @ApiProperty({
        example: 'admin@gmail.com',
        description: 'this field should have a valid email',
    })
    readonly email: string;

    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Your Password is weak',
    })
    @IsNotEmpty({
        message: 'You Should have a password to register',
    })
    @ApiProperty({
        description:
            'This password should contain at least one letter, one Capital Leter, and One number',
        example: '@veryPassw0rd',
    })
    readonly password: string;
    @IsNotEmpty()
    @ApiProperty({
        example: 'abdulqader_Q',
    })
    username: string;

    @Match('password', {
        message: 'Confirmation should be equal to the password',
    })
    @IsNotEmpty()
    @ApiProperty({
        description: 'This Property should match Password Property',
        example: '@veryPassw0rd',
    })
    passwordConfirmation: string;
}
