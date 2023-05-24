import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Client from "./Client";
import Doctor from "./Doctor";
import Clinic from "./Clinic";
import UserPermission from "./UserPermission";
import { v4 as uuid } from "uuid";

@Entity("users_profiles")
export default class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column({ name: "date_of_birth" })
  dateOfBirth: Date;

  @Column({ name: "phone_number" })
  phoneNumber: number;

  @Column()
  password: string;

  @OneToOne(() => Client, (client) => client.profile)
  client: Client;

  @OneToOne(() => Doctor, (doctor) => doctor.profile)
  doctor: Doctor;

  @OneToOne(() => Clinic, (clinic) => clinic.profile)
  clinic: Clinic;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.profile, {
    eager: true,
  })
  permissions: UserPermission[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
