import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Addresses from "./Addresses";
import ClinicAssociate from "./ClinicAssociate";
import UserProfile from "./UserProfile";
import { v4 as uuid } from "uuid";
@Entity("clinics")
export default class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Addresses, (Addresses) => Addresses.clinic, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: "clinics_addresses",
    joinColumn: {
      name: "clinic_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "address_id",
      referencedColumnName: "id",
    },
  })
  addresses: Addresses[];

  @OneToMany(() => ClinicAssociate, (clinicAssociate) => clinicAssociate.clinic)
  clinicAssociate: ClinicAssociate[];

  @OneToOne(() => UserProfile, (userProfile) => userProfile.clinic, {
    eager: true,
  })
  @JoinColumn({
    name: "profile_id",
    referencedColumnName: "id",
  })
  profile: UserProfile;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
