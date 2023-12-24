import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@tag/entities';
import { TagController } from '@tag/tag.controller';
import { TagService } from '@tag/tag.service';

@Module({
	imports: [TypeOrmModule.forFeature([TagEntity])],
	controllers: [TagController],
	providers: [TagService],
	exports: [TagService],
})
export class TagModule {}
