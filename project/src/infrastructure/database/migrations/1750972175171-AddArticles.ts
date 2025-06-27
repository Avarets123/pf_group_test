import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArticles1750972175171 implements MigrationInterface {
  name = 'AddArticles1750972175171';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "articles_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tagId" uuid NOT NULL, "articleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9fd3e82e675c84aaa42975b555a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(256) NOT NULL, "content" text, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "publishedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" ADD CONSTRAINT "FK_b54b6a9b430c2fabecd25d3732e" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" ADD CONSTRAINT "FK_4687c4e88354261c3032ada7e41" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_d08fa10065354a4a0192ae5d3db" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_d08fa10065354a4a0192ae5d3db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" DROP CONSTRAINT "FK_4687c4e88354261c3032ada7e41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" DROP CONSTRAINT "FK_b54b6a9b430c2fabecd25d3732e"`,
    );
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP TABLE "articles_tags"`);
  }
}
