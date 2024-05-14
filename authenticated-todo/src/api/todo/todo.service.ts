import { Todo } from 'src/database/entities/todo.entity';
import { Repository } from 'typeorm';

import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTodoDTO, UpdateTodoDTO } from './dto/todo.dto';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private readonly todoRepository: Repository<Todo>,
	) {}

	NOT_FOUND = 'TODO-NOT_FOUND';

	async getTodo(options: { where: any }): Promise<Todo> {
		const todo = await this.todoRepository.findOne({
			where: options.where,
		});

		if (!todo) {
			throw new NotFoundException({
				code: HttpStatus.NOT_FOUND,
				message: this.NOT_FOUND,
			});
		}
		return todo;
	}

	async findAll(uid: string) {
		return this.todoRepository.find({
			where: {
				userId: uid,
			},
		});
	}

	async findOne(id: string, uid: string) {
		const todo = await this.getTodo({
			where: {
				id: id,
				userId: uid,
			},
		});

		return {
			id: todo.id,
			title: todo.title,
			complete: todo.complete,
		};
	}

	async create(body: CreateTodoDTO, uid: string) {
		const todo = this.todoRepository.create({
			title: body.title,
			complete: false,
			userId: uid,
		});
		await this.todoRepository.save(todo);

		return {
			message: 'Todo created successfully',
			data: {
				id: todo.id,
				title: todo.title,
				complete: todo.complete,
			},
		};
	}

	async update(id: string, body: UpdateTodoDTO, uid: string) {
		const todo = await this.getTodo({
			where: {
				id: id,
				userId: uid,
			},
		});

		todo.title = body.title;
		todo.complete = body.status;

		await this.todoRepository.save(todo);
		return {
			message: 'Todo updated successfully',
			data: {
				id: todo.id,
				title: todo.title,
				complete: todo.complete,
			},
		};
	}

	async deleteAll(uid: string) {
		await this.todoRepository.delete({
			userId: uid,
		});
		return {
			message: 'All todos deleted successfully',
		};
	}

	async delete(id: string, uid: string) {
		const todo = await this.getTodo({
			where: {
				id: id,
				userId: uid,
			},
		});
		await this.todoRepository.remove(todo);
		return {
			message: 'Todo deleted successfully',
		};
	}
}
