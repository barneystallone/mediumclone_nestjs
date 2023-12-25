import { UserJWT } from '@/user/types';
import { Request } from 'express';

export interface ExpressRequest extends Request {
	user?: UserJWT;
}
