import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
	readonly username: string;

	readonly password: string;

	@IsNotEmpty()
	readonly email: string;

	readonly bio: string;

	readonly image: string;
}
