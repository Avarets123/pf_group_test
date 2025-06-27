import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TagsModule } from './modules/tags/tags.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthGlobalModule } from './modules/authGlobal/authGlobal.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TagsModule,
    ArticlesModule,
    AuthGlobalModule,
  ],
})
export class AppModule {}
