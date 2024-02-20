import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserProfile from "./UserProfile";
import Client from "./Client";
import ClientAssociate from "./ClientAssociate";
import { v4 as uuid } from "uuid";
@Entity("activity")
export default class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "patient_cpf" })
  patientCpf: number;

  @Column({ name: "professional_name" })
  profissionalName: string;

  @Column()
  price: number;

  @Column({ name: "date" })
  date: Date;

  @Column({ name: "specialty" })
  specialty: string;

  @Column({name: 'medical_procedure'})
  medical_procedure: string;

  @ManyToOne(
    () => ClientAssociate,
    (clientAssociate) => clientAssociate.activity
  )
  @JoinColumn({
    name: "client_associate_id",
    referencedColumnName: "id",
  })
  clientAssociate: ClientAssociate;

  @ManyToOne(() => Client, (client) => client.activity)
  @JoinColumn({
    name: "client_id",
    referencedColumnName: "id",
  })
  client: Client;

  @ManyToOne(() => UserProfile, (provider) => provider.activity)
  @JoinColumn({
    name: "provider_id",
    referencedColumnName: "id",
  })
  provider: UserProfile;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
