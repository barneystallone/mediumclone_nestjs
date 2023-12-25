import { hash } from 'bcrypt';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column({ unique: true })
	email: string;

	@Column({ default: '' })
	bio: string;

	@Column({ default: '' })
	image: string;

	@BeforeUpdate()
	@BeforeInsert()
	async hashPassword() {
		if (this.password) {
			this.password = await hash(this.password, 10);
		}
	}
}
