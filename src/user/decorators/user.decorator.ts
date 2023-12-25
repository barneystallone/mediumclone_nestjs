import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJWT } from '@user/types';

export type GetUserOutput = UserJWT | UserJWT[keyof UserJWT] | null;
export const GetUser = createParamDecorator(
	(data: keyof UserJWT, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest();

		if (!req.user) return null;
		if (data) {
			return req.user[data] ?? null;
		}

		return req.user;
	},
);
