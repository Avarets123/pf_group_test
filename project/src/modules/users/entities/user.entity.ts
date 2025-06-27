import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/userRole.enum';
import { compare, hash } from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 75, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 200, nullable: false, select: false })
  password: string;

  @Column('enum', { enum: UserRole, nullable: false, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  validatePasswd(rawPasswd: string): Promise<boolean> {
    return compare(rawPasswd, this.password);
  }

  async setPasswdHash(): Promise<void> {
    this.password = await hash(this.password, 8);
  }
}
