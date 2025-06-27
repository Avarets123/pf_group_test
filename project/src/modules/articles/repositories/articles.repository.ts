import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { transacting } from 'src/infrastructure/database/transacting';
import { ArticleEntity } from '../entities/aritcle.entity';
import { ArticleCreateDto } from '../dto/articleCreate.dto';
import { ArticleUpdateDto } from '../dto/articleUpdate.dto';
import { ArticleTagsEntity } from '../entities/articleTags.entity';

@Injectable()
export class ArticlesRepository {
  constructor(private readonly ds: DataSource) {}

  private getRepo(em?: EntityManager): Repository<ArticleEntity> {
    return (em || this.ds).getRepository(ArticleEntity);
  }

  //TODO
  async create(dto: ArticleCreateDto): Promise<ArticleEntity> {
    return transacting(async (em) => {
      const { tagsIds, ...other } = dto;

      const newArticle = await this.getRepo(em).save(other);
      if (!tagsIds?.length) return newArticle;

      const joinTags = tagsIds.map((tagId) => ({
        tagId,
        articleId: newArticle.id,
      }));

      await em.getRepository(ArticleTagsEntity).save(joinTags);
      return newArticle;
    });
  }

  async softDelete(id: string) {
    await this.getRepo().softDelete(id);
  }

  findOneOrThrow(id: string) {
    return this.getRepo()
      .findOneOrFail({ where: { id } })
      .catch(() => {
        throw new NotFoundException('ARTICLE_NOT_FOUND');
      });
  }

  createQueryBuilder(): {
    qb: SelectQueryBuilder<ArticleEntity>;
    alias: string;
  } {
    const alias = 'article';

    return {
      alias,
      qb: this.getRepo().createQueryBuilder(alias),
    };
  }

  async update(id: string, data: ArticleUpdateDto) {
    return transacting(async (em) => {
      const articleTagRepo = em.getRepository(ArticleTagsEntity);

      const { tagsIds, ...other } = data;

      await this.getRepo(em).update(id, other);

      if (tagsIds === null) {
        await articleTagRepo.delete({ articleId: id });
        return;
      }

      if (tagsIds?.length) {
        const joiTags = tagsIds.map((tagId) => ({ tagId, articleId: id }));
        await articleTagRepo.save(joiTags);
      }
    });
  }
}
