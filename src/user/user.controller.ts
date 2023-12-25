import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from './auth';
import { GetUser } from './decorators/user.decorator';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
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
	@UseGuards(AuthGuard)
	async getCurrentUser(
		@GetUser() user: UserJWT | null,
		@GetUser('email') email: string | null,
	): Promise<any> {
		if (!user) return null;
		// return req.headers['authorization'] =
		return {
			user: {
				...user,
				token: this.userService.generateJWT({ email, username: user.username }),
			},
			email,
		};
	}

	@Put()
	@UseGuards(AuthGuard)
	async updateCurrentUser(
		@Body('user') updateUserDto: UpdateUserDto,
		@GetUser('email') email: string,
	) {
		if (email !== updateUserDto.email) throw new ForbiddenException();
		return this.userService.updateCurrentUser(updateUserDto, email);
	}
}
