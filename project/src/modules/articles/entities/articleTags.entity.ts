import { TagEntity } from 'src/modules/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from './aritcle.entity';

@Entity('articles_tags')
export class ArticleTagsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  tagId: string;

  @ManyToOne(() => TagEntity, (tag) => tag.id)
  tag: TagEntity;

  @Column('uuid', { nullable: false })
  articleId: string;

  @ManyToOne(() => ArticleEntity, (art) => art.id)
  article: ArticleEntity;

  @CreateDateColumn()
  createdAt: Date;
}
