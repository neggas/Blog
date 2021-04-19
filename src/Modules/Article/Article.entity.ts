import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    BeforeInsert,
    OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../../entities/abstract-entity';
import { Like } from '../like/like.entity';
import { Photo } from '../Photo/Photo.entity';
import { User } from '../User/User.entity';
import slugify from 'slugify';

@Entity('Article')
export class Article extends AbstractEntity {
    @Column()
    title: string;

    @Column({ unique: true })
    slug?: string;

    @Column({
        type: 'varchar',
        length: 1000000,
    })
    body: string;

    @OneToOne(() => Photo)
    photo: Photo;

    @OneToMany(() => Like, (like) => like.article)
    likes: Like[];

    @ManyToOne(() => User, (user) => user.articles)
    author: User;

    @BeforeInsert()
    slugifyTheTitle() {
        this.slug = slugify(this.title);
    }
}
