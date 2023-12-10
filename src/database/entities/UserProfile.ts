import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
} from "typeorm";
import Client from "./Client";
import Doctor from "./Doctor";
import Clinic from "./Clinic";
import UserPermission from "./UserPermission";
import ProviderSpecialty from "./ProviderSpecialty";

import { v4 as uuid } from "uuid";

@Entity("users_profiles")
export default class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "cpf_cnpj" })
  cpf_cnpj: string;

  @Column({ name: "date_of_birth" })
  dateOfBirth: Date;

  @Column({ name: "phone_number" })
  phoneNumber: number;

  @Column()
  password: string;

  @Column()
  rg: string;

  @Column()
  avatar: string;

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

  @OneToMany(
    () => ProviderSpecialty,
    (providerSpecialty) => providerSpecialty.profile
  )
  providerSpecialty: ProviderSpecialty[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
