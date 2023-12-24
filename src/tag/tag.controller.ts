import { Controller, Get } from '@nestjs/common';
import { TagEntity } from './entities';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
	constructor(private tagService: TagService) {}

	@Get()
	async findAll(): Promise<{ tags: TagEntity[] }> {
		const tags = await this.tagService.findAll();

		return {
			tags,
		};
	}
}
