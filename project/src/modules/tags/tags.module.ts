import { Module } from '@nestjs/common';
import { TagsRepository } from './repositories/tags.repository';
import { TagsService } from './services/tags.service';
import { TagsController } from './controllers/tags.controller';

@Module({
  providers: [TagsRepository, TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
