import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {}
  async create(createTodoDto: CreateTodoDto, id: number) {
    const newTodo = {
      title: createTodoDto.title,
      user: { id },
    };
    return await this.todoRepository.save(newTodo);
  }

  async findAll(id: number) {
    return await this.todoRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const Todo = await this.todoRepository.findOne({
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
    const Todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    if (!Todo) throw new NotFoundException({ message: "No such Todo" });
    return await this.todoRepository.update(id, updateTodoDto);
  }

  async remove(id: number) {
    const Todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    if (!Todo) throw new NotFoundException({ message: "No such Todo" });
    return await this.todoRepository.delete(id);
  }
}
