import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Dash {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => User, (user) => user.dashes)
  @JoinColumn({ name: "user_id" })
  user: User;
}
