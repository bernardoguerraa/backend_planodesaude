import {
    Column,
    Entity,
    JoinTable,
    OneToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
  } from 'typeorm';
import Addresses from './Addresses';
import Associate from './Associate';
import UserProfile from './UserProfile';
import {v4 as uuid} from 'uuid';
  @Entity('clinics')
export default class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({name: "specialty", array:true, default:[]})
  specialty:string;

  @ManyToMany(
    () => Addresses,
    (Addresses) => Addresses.clinic,
    { eager: true, cascade: [ 'insert' ] }
  )
  @JoinTable({
    name: 'clinics_addresses',
    joinColumn: {
      name: 'clinic_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
  })
  addresses: Addresses[];


  @OneToMany(
    () => Associate,
    (Associates) => Associates.clinic,
    { eager: true, cascade: [ 'insert' ] }
  )
  @JoinTable({
    name: 'clinics_addresses',
    joinColumn: {
      name: 'clinic_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'associate_id',
      referencedColumnName: 'id',
    },
  })
  associate:Associate[];


  @OneToOne(
    () => UserProfile,
    (userProfile) => userProfile.clinic,
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