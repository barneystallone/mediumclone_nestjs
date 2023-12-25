import { ExpressRequest } from '@/common/types';
import { unSelect } from '@/common/utils';
import { Env } from '@/env/schema';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly configService: ConfigService<Env>,
		private readonly userService: UserService,
	) {}

	async use(req: ExpressRequest, res: Response, next: NextFunction) {
		if (!req.headers.authorization) {
			console.log('');
			req.user = null;
			return next();
		}

		const token = req.headers.authorization.split(' ')[1];

		try {
			const decode = verify(
				token,
				this.configService.get('JWT_SECRET'),
			) as JwtPayload & { email: string };

			const user = await this.userService
				.findByEmail(decode.email)
				.then((user) => {
					const newUser = unSelect(user, ['password', 'hashPassword']);
					return newUser;
				});

			req.user = user;

			return next();
		} catch (e) {
			req.user = null;
			return next();
		}
	}
}
