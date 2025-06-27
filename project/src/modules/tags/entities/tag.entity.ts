import { ArticleTagsEntity } from 'src/modules/articles/entities/articleTags.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, length: 100, unique: true })
  name: string;

  @Column('uuid', { nullable: false, select: false })
  creatorId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  creator: UserEntity;

  @OneToMany(() => ArticleTagsEntity, (tag) => tag.tagId)
  articles: ArticleTagsEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
