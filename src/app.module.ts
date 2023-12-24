import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { EnvModule } from '@/env/env.module';
// import { AuthMiddleware, UserController, UserModule } from '@user';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TagModule } from '@tag/tag.module';
import { AuthMiddleware } from '@user/middleware';
import { UserController } from '@user/user.controller';
import { UserModule } from '@user/user.module';

@Module({
	imports: [TagModule, EnvModule, DatabaseModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(UserController);
	}
}
