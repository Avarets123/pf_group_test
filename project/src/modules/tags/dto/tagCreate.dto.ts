import { IsDefined, IsString } from 'class-validator';

export class TagCreateDto {
  @IsDefined()
  @IsString()
  name: string;

  creatorId: string;
}
