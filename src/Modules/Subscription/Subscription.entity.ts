import { Exclude, Expose } from 'class-transformer';
import { AbstractEntity } from 'src/entities/abstract-entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from '../Profile/Profile.entity';

export enum Status {
    blocked = 'blocked',
    accepted = 'accepted',
    pending = 'pending',
}

@Entity()
@Exclude()
export class Subscription extends AbstractEntity {
    constructor(data?: Partial<Subscription>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    subscriberId: number;

    @Column()
    subscribedToId: number;

    @Expose()
    @ManyToOne(() => Profile, (profile) => profile.subscriptions)
    @JoinColumn({
        name: 'subscriberId',
    })
    subscriber: Profile;

    @Expose()
    @ManyToOne(() => Profile, (profile) => profile.subscripers)
    @JoinColumn({
        name: 'subscribedToId',
    })
    subscribedTo: Profile;

    @Column({
        type: 'enum',
        default: Status.pending,
        enum: Status,
    })
    status: Status;
}
