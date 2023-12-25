import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { AuthGuard } from './auth';
import { UserEntity } from './entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserService, AuthGuard],
	exports: [UserService],
})
export class UserModule {}
