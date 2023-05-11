import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
import Addresses from './Addresses';
import {v4 as uuid} from 'uuid';
import UserProfile from './UserProfile';

  @Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: "regular_payment"})
  regularPayment:boolean;  

  @ManyToMany(
    () => Addresses,
    (Addresses) => Addresses.client,
    { eager: true, cascade: [ 'insert' ] }
  )
  @JoinTable({
    name: 'clients_addresses',
    joinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
  })
  addresses: Addresses[];


  @OneToOne(
    () => UserProfile,
    (userProfile) => userProfile.client,
    { eager: true }
  )
  @JoinColumn({
    name: 'profile_id',
    referencedColumnName: 'id',
  })
  profile: UserProfile;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}