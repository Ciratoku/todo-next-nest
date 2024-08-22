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
import { DashService } from "./dash.service";
import { CreateDashDto } from "./dto/create-dash.dto";
import { UpdateDashDto } from "./dto/update-dash.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AuthorGuard } from "src/guards/author.guards";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("dashes")
@Controller("dashes")
export class DashController {
  constructor(private readonly dashService: DashService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createDashDto: CreateDashDto, @Req() req) {
    return this.dashService.create(createDashDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.dashService.findAll(+req.user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe())
  update(@Param("id") id: string, @Body() updateDashDto: UpdateDashDto) {
    return this.dashService.update(+id, updateDashDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param("id") id: string) {
    return this.dashService.remove(+id);
  }
}
