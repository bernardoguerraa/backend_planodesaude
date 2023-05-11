import {
    Column,
    Entity,
    JoinTable,
    OneToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';

import {v4 as uuid} from 'uuid';
  @Entity('request')
export default class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({name: "regional_council_number"})
  regionalCouncilNumber:string;
   
  @Column({name: "regional_council"})
  regionalCouncil:string;

  @Column({name: "date_of_birth"})
  dateOfBirth:Date;
  
  @Column({name: "specialty", array:true, default:[]})
  specialty:string;

  @Column()
  email:string;

  @Column({name: "phone_number"})
  phoneNumber: number;

  @Column()
  password:string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}