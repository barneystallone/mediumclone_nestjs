import { TagService } from '@/tag/tag.service';
import { Controller, Get } from '@nestjs/common';
import { TagEntity } from './entities/tag.entity';

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
