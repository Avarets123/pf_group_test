import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleCreateDto } from '../dto/articleCreate.dto';
import { ArticleEntity } from '../entities/aritcle.entity';
import { ArticleUpdateDto } from '../dto/articleUpdate.dto';
import { PagParamsDto } from 'src/infrastructure/pagination/dto/pagParams.dto';
import { PaginationResponse } from 'src/infrastructure/pagination/types/paginationRes.type';
import { mapQbToPagResponse } from 'src/infrastructure/pagination/utils/mapToResponse.util';
import { AuthDataType } from 'src/modules/auth/types/authData.type';
import { UserRole } from 'src/modules/users/enums/userRole.enum';
import { SelectQueryBuilder } from 'typeorm';
import { ArticleShowDto } from '../dto/articleShow.dto';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepo: ArticlesRepository) {}

  async create(dto: ArticleCreateDto): Promise<ArticleEntity> {
    return this.articlesRepo.create(dto);
  }
  findOneById(id: string, auth: AuthDataType) {
    const { alias, qb } = this.getDefaultQb(auth);
    return qb
      .andWhere(`${alias}.id = :id`, { id })
      .getOneOrFail()
      .then(this.mapperArticleToShow)
      .catch(() => {
        throw new NotFoundException('ARTICLE_NOT_FOUND');
      });
  }

  private getDefaultQb(auth: AuthDataType) {
    const { alias, qb } = this.articlesRepo.createQueryBuilder();

    const tagAlias = 'tags';
    qb.leftJoin(`${alias}.tags`, 'pt').leftJoin('pt.tag', tagAlias);
    qb.addSelect(['pt.id', `${tagAlias}.id`, `${tagAlias}.name`]);

    this.applyWhereByAuth(qb, alias, auth);

    return { alias, tagAlias, qb };
  }

  async listing(
    params: PagParamsDto,
    tags: string[],
    auth: AuthDataType,
  ): Promise<PaginationResponse<ArticleEntity | ArticleShowDto>> {
    const { tagAlias, qb } = this.getDefaultQb(auth);

    if (tags?.length) {
      qb.andWhere(`${tagAlias}.name IN (:...tags)`, { tags });
    }

    return mapQbToPagResponse<ArticleEntity, ArticleShowDto>(
      qb,
      params,
      this.mapperArticleToShow,
    );
  }

  private mapperArticleToShow(article: ArticleEntity): ArticleShowDto {
    return new ArticleShowDto(article);
  }

  private applyWhereByAuth(
    qb: SelectQueryBuilder<ArticleEntity>,
    alias: string,
    auth: AuthDataType,
  ) {
    if (auth?.role === UserRole.ADMIN) {
      qb.withDeleted();
    } else {
      qb.andWhere(
        `${alias}.publishedAt IS NOT NULL OR ${alias}.publishedAt <= now()`,
      );
    }
    return;
  }

  async update(id: string, dto: ArticleUpdateDto): Promise<void> {
    return this.articlesRepo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    return this.articlesRepo.softDelete(id);
  }
}
