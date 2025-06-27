import { IsInt, IsString } from 'class-validator';

export class PagParamsDto {
  @IsInt()
  limit: number = 10;

  @IsInt()
  offset = 0;

  @IsString()
  sortBy = 'createdAt';

  @IsString()
  sortDir: 'ASC' | 'DESC' = 'DESC';
}
