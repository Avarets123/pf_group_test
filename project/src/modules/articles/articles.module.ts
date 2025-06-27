import { Module } from '@nestjs/common';
import { ArticlesRepository } from './repositories/articles.repository';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './controllers/articles.controller';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesRepository, ArticlesService],
})
export class ArticlesModule {}
