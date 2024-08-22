import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dash } from "src/dash/entities/dash.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Dash, (dash) => dash.user, { onDelete: "CASCADE" })
  dashes: Dash[];
}
