import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import {
    BeforeInsert,
    Entity,
    Column,
    BeforeUpdate,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../../entities/abstract-entity';
import { Profile } from '../Profile/Profile.entity';
import { Article } from '../Article/Article.entity';
@Exclude()
@Entity()
export class User extends AbstractEntity {
    constructor(user: Partial<User> = {}) {
        super();
        Object.assign(this, user);
    }

    @Expose()
    @Column({ unique: true })
    email: string;

    @Expose()
    @Column({ unique: true })
    username: string;

    @Column()
    role: 'admin' | 'user' = 'user';
    @Column()
    password: string;

    @Column({
        nullable: true,
        select: false,
        type: 'date',
    })
    passwordChangedAt?: Date = undefined;

    @Column({
        default: null,
        select: false,
        type: 'varchar',
    })
    passwordResetToken: string = undefined;

    @Column({
        default: true,
        type: 'boolean',
    })
    active = true;

    @Column({
        default: false,
        type: 'boolean',
    })
    confirmed = false;

    @Expose()
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Article, (article) => article.author)
    articles: Article[];

    @Expose()
    token?: string;

    async compareWithHashedPassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}
