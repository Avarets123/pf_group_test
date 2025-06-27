import { PartialType } from '@nestjs/mapped-types';
import { ArticleCreateDto } from './articleCreate.dto';

export class ArticleUpdateDto extends PartialType(ArticleCreateDto) {}
