import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Article } from '../Article/Article.entity';
import { Comment } from '../Comment/Comment.entity';
import { Profile } from '../Profile/Profile.entity';
import { User } from '../User/User.entity';
export enum Type {
    happy = 'happy',
    sad = 'sad',
    angry = 'angry',
    like = 'like',
}

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: Type, type: 'enum', default: Type.like })
    type: string;

    @ManyToOne(() => Profile, (profile) => profile.likes, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;
    @ManyToOne(() => Article, (post) => post.likes, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'post_id' })
    article: Article;

    @ManyToOne(() => Comment, (post) => post.likes, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;
}
