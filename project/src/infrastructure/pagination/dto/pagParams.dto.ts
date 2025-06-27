import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class PagParamsDto {
  @IsInt()
  @Transform(({ value }) => Number(value))
  limit: number = 10;

  @IsInt()
  @Transform(({ value }) => Number(value))
  offset = 0;

  @IsString()
  sortBy = 'createdAt';

  @IsString()
  sortDir: 'ASC' | 'DESC' = 'DESC';
}
