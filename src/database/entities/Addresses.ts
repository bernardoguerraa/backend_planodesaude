import {
    Column, Entity, OneToOne,ManyToMany, PrimaryGeneratedColumn
  } from 'typeorm';
  import Client from './Client';
  import Doctor from './Doctor';
  import Clinic from './Clinic';
  import {v4 as uuid} from 'uuid';
  @Entity('addresses')
  export default class Addresses {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'street_name' })
    streetName: string;
  
    @Column()
    adjunct?: string;
  
    @Column()
    number: number;
  
    @Column()
    neighbourhood: string;
  
    @Column()
    city: string;
  
    @Column()
    state: string;
  
    @ManyToMany(() => Client, (client) => client.addresses)
    client: Client[];
  
    @ManyToMany(() => Doctor, (doctor) => doctor.addresses)
    doctor: Doctor[]

    @ManyToMany(() => Clinic, (clinic) => clinic.addresses)
    clinic: Clinic[]

    constructor(){
      if(!this.id){
        this.id = uuid();
      }
    }
  }
  