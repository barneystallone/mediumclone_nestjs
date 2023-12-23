import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  findAll() {
    this.tagService.findAll();
  }
}
