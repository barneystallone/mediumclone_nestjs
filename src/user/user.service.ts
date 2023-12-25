import { omit } from '@/common/utils';
import { Env } from '@/env/schema';
import {
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '@user/dto';
import { UserEntity } from '@user/entities';
import { UserJWT, UserResponse } from '@user/types';
import { compare } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly configService: ConfigService<Env>,
	) {}

	/**
	  1. Check if the email or username is existing
		2. Throw an error if it exists
		3. Save new user 
		4. Generate jwt token and return res
	*/
	async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
		// 1. Check if the email or username is existing
		const foundUser = await this.userRepository.findOne({
			where: [
				{ email: createUserDto.email },
				{ username: createUserDto.username },
			],
		});

		if (foundUser) {
			throw new UnprocessableEntityException('user or email are existing');
		}
		const newUser = plainToClass(UserEntity, createUserDto);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = await this.userRepository.save(newUser);
		const { email, username } = rest;

		return {
			user: {
				...rest,
				token: this.generateJWT({ email, username }),
			},
		};
	}

	async loginUser(loginUserDto: LoginUserDto): Promise<UserResponse> {
		const foundUser = await this.userRepository.findOne({
			where: { email: loginUserDto.email },
		});

		console.log(foundUser);
		if (!foundUser) throw new BadRequestException('email is not existing');

		const { password: hashPassword, ...rest } = foundUser;
		const { email, username } = rest;

		console.log('loginUserDto::', loginUserDto);
		console.log('hashPassword::', hashPassword);

		const isValidPassword = await compare(loginUserDto.password, hashPassword);

		if (!isValidPassword)
			throw new BadRequestException('Credential is invalid');

		return {
			user: {
				...rest,
				token: this.generateJWT({ email, username }),
			},
		};
	}
	generateJWT(data: UserJWT): string {
		return sign(data, this.configService.get<string>('JWT_SECRET'));
	}

	async findByEmail<K extends keyof UserEntity>(
		email: string,
		unSelect?: K[],
	): Promise<Omit<UserEntity, K>> {
		const foundUser = await this.userRepository.findOneBy({ email });
		return omit(foundUser, unSelect);
	}

	async updateCurrentUser(
		updateUserDto: UpdateUserDto,
		email: string,
	): Promise<Omit<UserEntity, 'hashPassword' | 'password'> | any> {
		const updateUserData = plainToClass(UserEntity, updateUserDto);
		return await this.userRepository.update({ email }, updateUserData);
	}
}
