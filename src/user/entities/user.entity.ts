import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column({ default: '' })
	bio: string;

	@Column({ default: '' })
	image: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}
}
