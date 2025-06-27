import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleTagsEntity } from './articleTags.entity';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 256, nullable: false })
  title: string;

  @Column('text', { nullable: true })
  content: string;

  @Column('uuid', { nullable: false })
  creatorId: string;

  @ManyToOne(() => UserEntity, (user) => user)
  creator: UserEntity;

  @OneToMany(() => ArticleTagsEntity, (tag) => tag.article)
  tags: ArticleTagsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  publishedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
