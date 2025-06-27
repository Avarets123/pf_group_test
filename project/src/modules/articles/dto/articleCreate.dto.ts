import {
  IsArray,
  IsDateString,
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ArticleCreateDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  tagsIds: string[];

  @IsDateString()
  @IsOptional()
  publishedAt: Date;

  creatorId: string;
}
