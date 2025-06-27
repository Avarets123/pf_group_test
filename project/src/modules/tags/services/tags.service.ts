import { Injectable } from '@nestjs/common';
import { TagsRepository } from '../repositories/tags.repository';
import { TagCreateDto } from '../dto/tagCreate.dto';
import { TagEntity } from '../entities/tag.entity';
import { PagParamsDto } from 'src/infrastructure/pagination/dto/pagParams.dto';
import { PaginationResponse } from 'src/infrastructure/pagination/types/paginationRes.type';
import { mapQbToPagResponse } from 'src/infrastructure/pagination/utils/mapToResponse.util';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepo: TagsRepository) {}

  async create(dto: TagCreateDto): Promise<TagEntity> {
    return this.tagsRepo.create(dto);
  }

  async listing(params: PagParamsDto): Promise<PaginationResponse<TagEntity>> {
    const { qb } = this.tagsRepo.createQueryBuilder();
    return mapQbToPagResponse(qb, params);
  }
}
