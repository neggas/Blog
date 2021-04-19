import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './Photo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Photo])],
})
export class PhotoModule {}
