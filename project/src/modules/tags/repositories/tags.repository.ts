import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { transacting } from 'src/infrastructure/database/transacting';
import { TagEntity } from '../entities/tag.entity';
import { TagCreateDto } from '../dto/tagCreate.dto';

@Injectable()
export class TagsRepository {
  constructor(private readonly ds: DataSource) {}

  private getRepo(em?: EntityManager): Repository<TagEntity> {
    return (em || this.ds).getRepository(TagEntity);
  }

  //TODO
  async create(dto: TagCreateDto) {
    return transacting(async (em) => {
      const hasUserByEmail = await this.findByNameAndThrow(dto.name, em).catch(
        () => null,
      );

      if (hasUserByEmail) {
        throw new BadRequestException('USER_BY_PASSED_EMAIL_EXISTS');
      }

      return this.getRepo(em).save(dto);
    });
  }

  createQueryBuilder(): {
    qb: SelectQueryBuilder<TagEntity>;
    alias: string;
  } {
    const alias = 'tag';

    return {
      alias,
      qb: this.getRepo().createQueryBuilder(alias),
    };
  }

  async findByNameAndThrow(
    name: string,
    em?: EntityManager,
  ): Promise<TagEntity> {
    return this.getRepo(em).findOneOrFail({
      where: { name },
      select: ['id'],
    });
  }
}
