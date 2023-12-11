import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";

import Client from "./Client";
import { v4 as uuid } from "uuid";
@Entity("client_associate")
export default class ClientAssociate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "cpf" })
  cpf: string;

  @Column()
  rg: string;

  @Column({ name: "phone_number" })
  phoneNumber: number;

  @Column({ name: "date_of_birth" })
  dateOfBirth: Date;

  @ManyToOne(() => Client, (client) => client.clientAssociate)
  @JoinColumn({
    name: "client_id",
    referencedColumnName: "id",
  })
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
