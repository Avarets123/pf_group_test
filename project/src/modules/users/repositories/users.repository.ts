import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserCreateDto } from '../dto/userCreate.dto';
import { transacting } from 'src/infrastructure/database/transacting';

@Injectable()
export class UsersRepository {
  constructor(private readonly ds: DataSource) {}

  private getRepo(em?: EntityManager): Repository<UserEntity> {
    return (em ?? this.ds).getRepository(UserEntity);
  }

  //TODO
  async create(dto: UserCreateDto) {
    return transacting(async (em) => {
      const repo = this.getRepo(em);

      const hasUserByEmail = await this.findByEmailAndThrow(
        dto.email,
        ['id'],
        em,
      ).catch(() => null);

      if (hasUserByEmail) {
        throw new BadRequestException('USER_BY_PASSED_EMAIL_EXISTS');
      }

      console.log(em.queryRunner?.isTransactionActive);

      const newUser = repo.create(dto);

      await newUser.setPasswdHash();

      return await repo.save(newUser);
    });
  }

  async softDelete(id: string) {
    await this.getRepo().softDelete(id);
  }

  createQueryBuilder(): {
    qb: SelectQueryBuilder<UserEntity>;
    alias: string;
  } {
    const alias = 'user';

    return {
      alias,
      qb: this.getRepo().createQueryBuilder(alias),
    };
  }

  async findByEmailAndThrow(
    email: string,
    select: (keyof UserEntity)[] = ['id'],
    em?: EntityManager,
  ): Promise<UserEntity> {
    return this.getRepo(em).findOneOrFail({ where: { email }, select });
  }

  async findByIdAndThrow(id: string, em?: EntityManager): Promise<UserEntity> {
    return this.getRepo(em)
      .findOneOrFail({ where: { id } })
      .catch(() => {
        throw new NotFoundException('USER_BY_PASSED_ID_NOT_FOUND');
      });
  }
}
