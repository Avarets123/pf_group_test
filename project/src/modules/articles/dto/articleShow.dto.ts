import { OmitType } from '@nestjs/mapped-types';
import { ArticleEntity } from '../entities/aritcle.entity';
import { ArticleTagsEntity } from '../entities/articleTags.entity';

type TagShowType = {
  id: string;
  name: string;
};

export class ArticleShowDto extends OmitType(ArticleEntity, ['tags']) {
  private mapTags(tags: ArticleTagsEntity[]): TagShowType[] {
    if (!tags?.length) return [];
    return tags.map((el) => ({ id: el.tag.id, name: el.tag.name }));
  }

  constructor(article: ArticleEntity) {
    super();
    Object.assign(this, article);
    this.tags = this.mapTags(article.tags);
  }

  tags: TagShowType[];
}
