import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { GetUser } from './decorators/user.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserJWT, UserResponse } from './types';
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
	async getCurrentUser(
		@GetUser() user: UserJWT | null,
		@GetUser('email') email: string | null,
	): Promise<any> {
		// return req.headers['authorization'] =
		return {
			user,
			email,
		};
	}
}
