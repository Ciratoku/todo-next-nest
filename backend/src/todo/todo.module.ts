import { Module } from "@nestjs/common";
import { TodoService } from "./Todo.service";
import { TodoController } from "./Todo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./entities/Todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
