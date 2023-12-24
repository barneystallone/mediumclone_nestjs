import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { EnvModule } from '@/env/env.module';
import { TagModule } from '@/tag/tag.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TagModule, EnvModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
