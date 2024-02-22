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

  @Column({name: 'email'})
  email:string;

  @Column({name: "phone_number"})
  phoneNumber: number;

  @Column({name: 'password'})
  password:string;

  @Column({name: 'cpf_cnpj'})
  cpf_cnpj:number;

  @Column({name: 'rg'})
  rg: string;

  @Column({name: 'avatar'})
  avatar: string;

  @Column({name: 'regular_payment'})
  regular_payment: boolean;

  @Column({name: 'street_name'})
  street_name: string;

  @Column({name: "cep"})
  cep: number;

  @Column({name: "number"})
  number: number;

  @Column({name: "neighbourhood"})
  neighbourhood: string;

  @Column({name: 'city'})
  city: string;

  @Column({name: 'state'})
  state: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}