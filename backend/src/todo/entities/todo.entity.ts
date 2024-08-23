import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: "user_id" })
  user: User;
}
