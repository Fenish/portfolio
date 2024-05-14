import { ProtectedRoute } from 'src/decorators/auth/auth.decorator';
import { IsValidUUID } from 'src/pipes/isUuid.pipe';

import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	Session,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTodoDTO, UpdateTodoDTO } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@ApiTags('Todo')
export class TodoController {
	constructor(@Inject(TodoService) private readonly service: TodoService) {}

	@Get()
	@ProtectedRoute()
	async findAll(@Session() session: Record<string, any>) {
		return this.service.findAll(session.uid);
	}

	@Get(':id')
	@ProtectedRoute()
	async findOne(
		@Param('id', IsValidUUID) id: string,
		@Session() session: Record<string, any>,
	) {
		return this.service.findOne(id, session.uid);
	}

	@Post()
	@ProtectedRoute()
	async create(
		@Body() body: CreateTodoDTO,
		@Session() session: Record<string, any>,
	) {
		return this.service.create(body, session.uid);
	}

	@Put(':id')
	@ProtectedRoute()
	async update(
		@Param('id', IsValidUUID) id: string,
		@Body() body: UpdateTodoDTO,
		@Session() session: Record<string, any>,
	) {
		return this.service.update(id, body, session.uid);
	}

	@Delete('all')
	@ProtectedRoute()
	async deleteAll(@Session() session: Record<string, any>) {
		return this.service.deleteAll(session.uid);
	}

	@Delete(':id')
	@ProtectedRoute()
	async delete(
		@Param('id', IsValidUUID) id: string,
		@Session() session: Record<string, any>,
	) {
		return this.service.delete(id, session.uid);
	}
}
