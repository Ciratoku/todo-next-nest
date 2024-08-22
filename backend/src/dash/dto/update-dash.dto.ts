import { PartialType } from "@nestjs/swagger";
import { CreateDashDto } from "./create-dash.dto";

export class UpdateDashDto extends PartialType(CreateDashDto) {}
