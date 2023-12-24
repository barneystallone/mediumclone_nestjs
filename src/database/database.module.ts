import typeormConfig from '@/database/config/orm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeormConfig.asProvider())],
})
export class DatabaseModule {}
