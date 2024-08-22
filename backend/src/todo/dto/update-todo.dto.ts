import { PartialType } from "@nestjs/swagger";
import { CreateTodoDto } from "./create-Todo.dto";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
