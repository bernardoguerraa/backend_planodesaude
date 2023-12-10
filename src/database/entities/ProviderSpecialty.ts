import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserProfile from "./UserProfile";
import Specialty from "./Specialty";
import { v4 as uuid } from "uuid";
@Entity("provider_specialty")
export default class ProviderSpecialty {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  role: string;

  @ManyToOne(
    () => UserProfile,
    (userProfile) => userProfile.providerSpecialty,
    {
      eager: true,
    }
  )
  @JoinColumn({
    name: "provider_id",
    referencedColumnName: "id",
  })
  profile: UserProfile;

  @ManyToOne(() => Specialty, (specialty) => specialty.providerSpecialty, {
    eager: true,
  })
  @JoinColumn({
    name: "specialty_id",
    referencedColumnName: "id",
  })
  specialty: Specialty;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
