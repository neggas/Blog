import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNumber,
    IsOptional,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class UserUpdateDTO {
    @MinLength(2, { message: ' The min length of first name 2 ' })
    @MaxLength(26, { message: ' The max length of first name 26 ' })
    @IsOptional()
    @ApiPropertyOptional({
        default: 'John',
    })
    readonly firstName?: string;

    @MinLength(2, { message: ' The min length of last name 2 ' })
    @MaxLength(26, { message: ' The max length of last name 26 ' })
    @IsOptional()
    @ApiPropertyOptional({
        default: 'Smith',
    })
    readonly lastName?: string;

    @Min(12)
    @Max(100)
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        default: 15,
    })
    readonly age?: number;

    @IsOptional()
    @ApiPropertyOptional({
        default: '0943871416',
    })
    phone?: string;

    @IsOptional()
    @ApiPropertyOptional({
        default: new Date(Date.now()),
    })
    birthday?: Date;

    @IsOptional()
    @ApiPropertyOptional({
        default: 'www.xz.com',
    })
    website?: string;

    @IsOptional()
    @ApiPropertyOptional({
        default: 'Engineer',
    })
    occupation?: string;
}
