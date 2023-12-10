import {
  Column,
  Entity,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import UserProfile from "./UserProfile";
import ProviderSpecialty from "./ProviderSpecialty";
import { v4 as uuid } from "uuid";
@Entity("specialty")
export default class Specialty {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => ProviderSpecialty,
    (providerSpecialty) => providerSpecialty.specialty
  )
  providerSpecialty: ProviderSpecialty[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
