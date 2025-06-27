import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationResponse } from '../types/paginationRes.type';
import { PagParamsDto } from '../dto/pagParams.dto';

//TODO
export type mapperFn = (data: any) => any;

export const mapQbToPagResponse = async <T extends ObjectLiteral, MT>(
  qb: SelectQueryBuilder<T>,
  pagParams: PagParamsDto,
  mapperFn?: mapperFn,
): Promise<PaginationResponse<T | MT>> => {
  const { limit, offset } = pagParams;

  return qb
    .take(limit)
    .skip(offset)
    .orderBy(`${qb.alias}.${pagParams.sortBy}`, pagParams.sortDir)
    .getManyAndCount()
    .then(([dataDb, total]) => {
      const data = mapperFn ? dataDb.map(mapperFn) : dataDb;
      return {
        data: data as MT[],
        limit,
        offset,
        total,
      };
    });
};
