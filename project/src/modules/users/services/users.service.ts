import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserCreateDto } from '../dto/userCreate.dto';
import { PagParamsDto } from 'src/infrastructure/pagination/dto/pagParams.dto';
import { PaginationResponse } from 'src/infrastructure/pagination/types/paginationRes.type';
import { UserEntity } from '../entities/user.entity';
import { AuthDataType } from 'src/modules/auth/types/authData.type';
import { SelectQueryBuilder } from 'typeorm';
import { UserRole } from '../enums/userRole.enum';
import { mapQbToPagResponse } from 'src/infrastructure/pagination/utils/mapToResponse.util';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async create(dto: UserCreateDto) {
    return this.usersRepo.create(dto);
  }

  async listing(
    params: PagParamsDto,
    auth: AuthDataType,
  ): Promise<PaginationResponse<UserEntity>> {
    const { alias, qb } = this.usersRepo.createQueryBuilder();
    this.applyWhereByAuth(qb, alias, auth);
    return mapQbToPagResponse(qb, params);
  }

  async delete(id: string) {
    await this.usersRepo.softDelete(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepo
      .findByEmailAndThrow(email, ['id', 'email', 'password', 'role'])
      .catch(() => {
        throw new NotFoundException('USER_BY_PASSED_EMAIL_NOT_FOUND');
      });
  }

  findOneById(id: string) {
    return this.usersRepo.findByIdAndThrow(id);
  }

  private applyWhereByAuth(
    qb: SelectQueryBuilder<UserEntity>,
    alias: string,
    auth: AuthDataType,
  ) {
    if (auth?.role === UserRole.ADMIN) {
      qb.withDeleted();
    } else {
      qb.andWhere(`${alias}.role = 'user'`);
    }
    return;
  }
}
