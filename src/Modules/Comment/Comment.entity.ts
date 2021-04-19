import { AbstractEntity } from 'src/entities/abstract-entity';
import { Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Article } from '../Article/Article.entity';
import { Like } from '../like/like.entity';
import { Photo } from '../Photo/Photo.entity';
import { User } from '../User/User.entity';

@Entity()
export class Comment extends AbstractEntity {
    @ManyToOne(() => User)
    user: User;
    @ManyToOne(() => Article)
    article: Article;
    @OneToMany(() => Like, (_) => _.comment)
    likes: Like[];
    @OneToOne(() => Photo)
    photo: Photo;
}
