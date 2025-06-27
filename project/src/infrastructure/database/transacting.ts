import { EntityManager } from 'typeorm';
import { dataSource } from './configs/datasource';

export const transacting = async <T>(
  callback: (entityManager: EntityManager) => Promise<T>,
  entityManager?: EntityManager,
): Promise<T> => {
  if (!entityManager) {
    return dataSource.transaction((entityManager) => callback(entityManager));
  }

  return callback(entityManager);
};
