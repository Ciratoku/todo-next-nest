import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AuthorGuard } from "src/guards/author.guards";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("todos")
@Controller("todos")
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.TodoService.create(createTodoDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.TodoService.findAll(+req.user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe())
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.TodoService.update(+id, updateTodoDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param("id") id: string) {
    return this.TodoService.remove(+id);
  }
}
