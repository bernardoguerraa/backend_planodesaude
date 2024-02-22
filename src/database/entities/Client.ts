import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Addresses from "./Addresses";
import { v4 as uuid } from "uuid";
import UserProfile from "./UserProfile";
import ClientAssociate from "./ClientAssociate";
import Activity from "./Activity";
@Entity("clients")
export default class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "regular_payment" })
  regularPayment: boolean;

  @ManyToMany(() => Addresses, (Addresses) => Addresses.client, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: "clients_addresses",
    joinColumn: {
      name: "client_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "address_id",
      referencedColumnName: "id",
    },
  })
  addresses: Addresses[];

  @OneToOne(() => UserProfile, (userProfile) => userProfile.client, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({
    name: "profile_id",
    referencedColumnName: "id",
  })
  profile: UserProfile;

  @OneToMany(() => ClientAssociate, (clientAssociate) => clientAssociate.client)
  clientAssociate: ClientAssociate[];

  @OneToMany(() => Activity, (activity) => activity.client)
  activity: Activity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
