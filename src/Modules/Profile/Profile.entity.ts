import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Like } from '../like/like.entity';
import { Photo } from '../Photo/Photo.entity';
import { Subscription } from '../Subscription/Subscription.entity';

@Entity()
export class Profile {
    constructor(data?: Partial<Profile>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        nullable: true,
    })
    phone?: string;

    @Column({
        nullable: true,
        type: 'date',
    })
    birthday?: Date;

    @Column({
        nullable: true,
    })
    website?: string;

    @Column({
        nullable: true,
    })
    occupation?: string;
    @Column({
        default: 'John',
    })
    firstName: string;

    @Column({
        default: 'Smith',
    })
    lastName: string;

    @Column({
        nullable: true,
    })
    age?: number = undefined;

    @OneToMany(() => Subscription, (subs) => subs.subscriber)
    subscriptions: Subscription[];

    @OneToMany(() => Subscription, (subs) => subs.subscribedTo)
    subscripers: Subscription[];

    @OneToMany(() => Photo, (photo) => photo.profile)
    photos: Photo[];

    @OneToMany(() => Like, (like: Like) => like.user)
    likes: Like[];
}
