import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './Article.controller';
import { Article } from './Article.entity';
import { ArticleService } from './Article.service';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticleService],
    controllers: [ArticleController],
    exports: [ArticleService],
})
export class ArticleModule {}
