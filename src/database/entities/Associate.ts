import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import Clinic from "./Clinic";
import { v4 as uuid } from "uuid";
@Entity("associates")
export default class Associate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "regional_council_number" })
  regionalCouncilNumber: string;

  @Column({ name: "regional_council" })
  regionalCouncil: string;

  @Column({ name: "date_of_birth" })
  dateOfBirth: Date;

  @Column({ name: "specialty", array: true, default: [] })
  specialty: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.associate)
  @JoinColumn({
    name: "clinic_id",
    referencedColumnName: "id",
  })
  clinic: Clinic;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
