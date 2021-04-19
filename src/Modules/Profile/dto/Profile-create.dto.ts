import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsOptional,
    Length,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class ProfileCreateDTO {
    @IsOptional()
    @ApiPropertyOptional({
        example: '0943871416',
    })
    @Length(10, 10)
    phone?: string;
    @IsOptional()
    @ApiPropertyOptional({
        example: '2-2-2000',
    })
    birthday?: Date;
    @IsOptional()
    @ApiPropertyOptional({
        example: 'www.facebook.com',
    })
    website?: string;
    @IsOptional()
    @ApiPropertyOptional({
        example: 'software engineer',
    })
    occupation?: string;
    @IsOptional()
    @MinLength(2)
    @MaxLength(36)
    @ApiPropertyOptional({
        example: 'John',
    })
    firstName?: string;
    @IsOptional()
    @MinLength(2)
    @MaxLength(36)
    @ApiPropertyOptional({
        example: 'Smith',
    })
    lastName?: string;
    @IsOptional()
    @Min(12)
    @Max(100)
    @ApiPropertyOptional({
        example: 15,
    })
    age?: number;
}
