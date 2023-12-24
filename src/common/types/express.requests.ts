import { UserEntity } from '@/user/entities';
import { Request } from 'express';

export interface ExpressRequest extends Request {
	user?: UserEntity;
}
