import {
    Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn
  } from 'typeorm';
  import UserProfile from './UserProfile';
  import {v4 as uuid} from 'uuid';
  @Entity('user_permissions')
  export default class UserPermission {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'access_type' })
    accessType: 'permission' | 'role';
  
    @Column()
    access: string;
  
    @Column({ name: 'is_revoked' })
    isRevoked: boolean;

    @ManyToOne(
      () => UserProfile,
      (userProfile) => userProfile.permissions
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
  