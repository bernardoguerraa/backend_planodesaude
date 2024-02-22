import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";

import Client from "./Client";
import UserProfile from "./UserProfile";
import { v4 as uuid } from "uuid";
import Activity from "./Activity";
@Entity("client_associate")
export default class ClientAssociate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Activity, (activity) => activity.clientAssociate)
  activity: Activity[];

  @ManyToOne(() => Client, (client) => client.clientAssociate, { eager: true })
  @JoinColumn({
    name: "client_id",
    referencedColumnName: "id",
  })
  client: Client;

  @OneToOne(() => UserProfile, (profile) => profile.clientAssociate, {
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
