import { UserEntity } from '@user/entities';

export type UserJWT = Pick<UserEntity, 'email' | 'username'>;
