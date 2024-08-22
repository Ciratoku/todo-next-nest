import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDashDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
