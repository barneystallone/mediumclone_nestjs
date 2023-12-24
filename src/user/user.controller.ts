import { ExpressRequest } from '@/common/types';
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserResponse } from './types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	async createUser(
		@Body('user') createUserDto: CreateUserDto,
	): Promise<UserResponse> {
		return this.userService.createUser(createUserDto);
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async loginUser(
		@Body('user') loginUserDto: LoginUserDto,
	): Promise<UserResponse> {
		return this.userService.loginUser(loginUserDto);
	}

	@Get()
	async getCurrentUser(@Req() req: ExpressRequest): Promise<any> {
		// return req.headers['authorization'] =
		return req.user;
	}
}
