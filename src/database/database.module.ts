import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config';

@Module({
	imports: [TypeOrmModule.forRootAsync(ormConfig.asProvider())],
})
export class DatabaseModule {}
