import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './Article.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Article } from './Article.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: Article,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
        },
    },
    query: {
        cache: 3000,
        limit: 1000,
        alwaysPaginate: true,
    },
})
@ApiTags('Articles')
@Controller('Articles')
export class ArticleController implements CrudController<Article> {
    constructor(public service: ArticleService) {}
}
