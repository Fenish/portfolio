import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Todo {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	title: string;

	@Column()
	complete: boolean;

	@ManyToOne(() => User, (user) => user.todos)
	user: User;

	@Column({ select: false })
	userId: string;
}
