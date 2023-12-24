import { UserEntity } from '@user/entities';

export type UserResponse = {
	user: Omit<UserEntity, 'hashPassword' | 'password'> & {
		token: string;
	};
};

export type LoginUserResponse = UserResponse;
