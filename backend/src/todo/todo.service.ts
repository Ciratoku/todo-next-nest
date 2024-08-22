import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-Todo.dto";
import { UpdateTodoDto } from "./dto/update-Todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/Todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly TodoRepository: Repository<Todo>
  ) {}
  async create(createTodoDto: CreateTodoDto, id: number) {
    const newTodo = {
      title: createTodoDto.title,
      user: { id },
    };
    return await this.TodoRepository.save(newTodo);
  }

  async findAll(id: number) {
    return await this.TodoRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const Todo = await this.TodoRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!Todo) throw new NotFoundException({ message: "No such Todo" });
    return Todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const Todo = await this.TodoRepository.findOne({
      where: {
        id,
      },
    });
    if (!Todo) throw new NotFoundException({ message: "No such Todo" });
    return await this.TodoRepository.update(id, updateTodoDto);
  }

  async remove(id: number) {
    const Todo = await this.TodoRepository.findOne({
      where: {
        id,
      },
    });
    if (!Todo) throw new NotFoundException({ message: "No such Todo" });
    return await this.TodoRepository.delete(id);
  }
}
