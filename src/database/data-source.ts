import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvExpand.expand(dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));
export const dataSourceOptions = (): DataSourceOptions => {
  return {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*.js'],
  } as const satisfies TypeOrmModuleOptions;
};

export default new DataSource({
  ...dataSourceOptions(),
});
