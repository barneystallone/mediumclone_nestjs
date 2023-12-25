import { ExpressRequest } from '@/common/types';
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest<ExpressRequest>();

		if (req.user) return true;

		throw new UnauthorizedException();
	}
}
