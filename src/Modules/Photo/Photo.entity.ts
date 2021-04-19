import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Article } from '../Article/Article.entity';
import { Profile } from '../Profile/Profile.entity';

@Entity('Photo')
export class Photo {
    @PrimaryGeneratedColumn('increment')
    id;
    @Column()
    caption: string;

    @Column()
    url: string;

    @Column()
    width: number;

    @Column()
    height: number;

    @CreateDateColumn()
    uploadDate: Date;

    @ManyToOne(() => Profile, (profile) => profile.photos)
    profile: Profile;
}
