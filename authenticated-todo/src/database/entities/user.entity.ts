import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Profile } from './profile.entity';
import { Todo } from './todo.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToOne(() => Profile, { cascade: true })
	@JoinColumn()
	profile: Profile;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
