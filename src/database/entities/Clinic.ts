import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Addresses from "./Addresses";
import ClinicAssociate from "./ClinicAssociate";
import UserProfile from "./UserProfile";
import { v4 as uuid } from "uuid";
@Entity("clinics")
export default class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //uma clinica pode ter mais de um endereco, um endereco pode ter mais que uma clinica
  //eager e cascade indica que o endereco deve ser gerado automaticamente quando uma clinica for criada
  @ManyToMany(() => Addresses, (Addresses) => Addresses.clinic, {
    eager: true,
    cascade: true,
  })
  //nome da tabela de juncao 'clinics_addresses'
  //nome das colunas que armazenarao as chaves estrangeiras 'clinic_id' e 'address_id'
  @JoinTable({
    name: "clinics_addresses",
    joinColumn: {
      name: "clinic_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "address_id",
      referencedColumnName: "id",
    },
  })
  addresses: Addresses[];

  //relaciomaneto OneToMany entre clinica e associados, uma clinica tem varios associados
  @OneToMany(() => ClinicAssociate, (clinicAssociate) => clinicAssociate.clinic)
  clinicAssociate: ClinicAssociate[];

  //relacionamento OneToOne entre clinica e usuario, uma clinica tem um usuario associado
  //coluna de juncao 'profile_id'
  @OneToOne(() => UserProfile, (userProfile) => userProfile.clinic, {
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
