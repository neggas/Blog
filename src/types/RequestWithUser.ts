import { User } from 'src/Modules/User/User.entity';

export type RequestWithUser = Request & { user: User };
