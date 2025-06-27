import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './configs/typeorm.config';
import { dataSource } from './configs/datasource';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig)],
})
export class DatabaseModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    try {
      await dataSource.initialize();
      Logger.log('Datasource has been initialized!');
    } catch (error) {
      Logger.error(error);
      Logger.error('Error in connecting to DB');
      throw error;
    }
  }
}
