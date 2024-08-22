import { Module } from "@nestjs/common";
import { DashService } from "./dash.service";
import { DashController } from "./dash.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dash } from "./entities/dash.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Dash])],
  controllers: [DashController],
  providers: [DashService],
})
export class DashModule {}
