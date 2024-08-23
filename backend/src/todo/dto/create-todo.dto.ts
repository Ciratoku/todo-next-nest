import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  createdAt: Date;
}
