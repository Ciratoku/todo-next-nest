import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDashDto } from "./dto/create-dash.dto";
import { UpdateDashDto } from "./dto/update-dash.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Dash } from "./entities/dash.entity";
import { Repository } from "typeorm";

@Injectable()
export class DashService {
  constructor(
    @InjectRepository(Dash) private readonly dashRepository: Repository<Dash>
  ) {}
  async create(createDashDto: CreateDashDto, id: number) {
    const newDash = {
      title: createDashDto.title,
      user: { id },
    };
    return await this.dashRepository.save(newDash);
  }

  async findAll(id: number) {
    return await this.dashRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const dash = await this.dashRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!dash) throw new NotFoundException({ message: "No such dash" });
    return dash;
  }

  async update(id: number, updateDashDto: UpdateDashDto) {
    const dash = await this.dashRepository.findOne({
      where: {
        id,
      },
    });
    if (!dash) throw new NotFoundException({ message: "No such dash" });
    return await this.dashRepository.update(id, updateDashDto);
  }

  async remove(id: number) {
    const dash = await this.dashRepository.findOne({
      where: {
        id,
      },
    });
    if (!dash) throw new NotFoundException({ message: "No such dash" });
    return await this.dashRepository.delete(id);
  }
}
