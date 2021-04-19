import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { isNullOrUndefined } from 'src/Utils/isNullOrUndefined';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UserService) {}

    async validate(email: string): Promise<boolean> {
        try {
            await this.usersService.findOne({
                where: {
                    email,
                },
            });
            return false;
        } catch (err) {
            return true;
        }
    }

    defaultMessage(): string {
        return 'The email «$value» is already register.';
    }
}
export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}
