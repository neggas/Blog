import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../Article/Article.entity';
import { Photo } from '../Photo/Photo.entity';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Article)
    article: Article;

    @ManyToOne(() => Photo)
    photo: Photo;

    @Column()
    title: string;
}
