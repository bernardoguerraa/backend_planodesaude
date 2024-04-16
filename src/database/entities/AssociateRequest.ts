import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
  import UserProfile from "./UserProfile";
import {v4 as uuid} from "uuid";
  @Entity("associate_request")
export default class AssociateRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "associate_name" })
  name: string;

  @Column({name: "associate_cpf"})
  regionalCouncilNumber:string;
   
  @Column({ name: "date" })
  date: Date;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.client, {
    eager: true 
  })
  @JoinColumn({
    name: "profile_id",
    referencedColumnName: "id",
})
profile: UserProfile;
  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}