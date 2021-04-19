import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../entities/abstract-entity';
import { Photo } from '../Photo/Photo.entity';

@Entity('Category')
export class Category extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToOne(() => Category)
    @JoinColumn()
    parentCategory: Category;

    @OneToOne(() => Photo)
    @JoinColumn()
    photo: Photo;
}
