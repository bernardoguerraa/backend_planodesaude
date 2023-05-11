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
import UserProfile from './UserProfile';
import {v4 as uuid} from 'uuid';

  @Entity('doctors')
export default class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: "regional_council_number"})
  regionalCouncilNumber:string;
   
  @Column({name: "regional_council"})
  regionalCouncil:string;

  
  @Column({name: "specialty", array:true, default:[]})
  specialty:string;


  @ManyToMany(
    () => Addresses,
    (Addresses) => Addresses.doctor,
    { eager: true, cascade: [ 'insert' ] }
  )
  @JoinTable({
    name: 'doctors_addresses',
    joinColumn: {
      name: 'doctor_id',
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
    (userProfile) => userProfile.doctor,
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