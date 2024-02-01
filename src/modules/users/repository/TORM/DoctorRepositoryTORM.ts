/* eslint-disable quotes */

import DoctorRepository from "../DoctorRepository";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import { getRepository, Repository as ORMRepository } from "typeorm";
import Doctor from "../../../../database/entities/Doctor";

export default class DoctorRepositoryTORM implements DoctorRepository {
  private ormRepository: ORMRepository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }
  async find(filters: Filters<Doctor>): Promise<Doctor[]> {
    const customers = await this.ormRepository.find(filters);

    return customers;
  }

  async findByEmail(email: string): Promise<Doctor | undefined> {
    const result = await this.ormRepository
      .createQueryBuilder("doctors")
      .innerJoinAndSelect("doctors.profile", "profile")
      .leftJoinAndSelect("profile.permissions", "permissions")
      .where("profile.email = :email AND permissions.isRevoked = false", {
        email,
      })
      .getOne();
    const doctor = await this.ormRepository.findOne({
      where: { id: result?.id },
    });
    return doctor;
  }

  async findDoctor(): Promise<Doctor[]> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  async create(model: Model<Doctor>): Promise<Doctor> {
    let customer = this.ormRepository.create(model);
    customer = await this.ormRepository.save(customer);

    return customer;
  }

  updateById(id: string, partialModel: Doctor): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findDoctorById(doctorid: string): Promise<Doctor> {
    const doctor = await this.ormRepository.findOne({
      where: { id: doctorid},
    });
    return doctor;
  }

  async updateAddress(
    partialModel: Doctor,
    streetName: string,
    number: number,
    neighbourhood: string,
    city: string,
    state: string,
    cep: number
  ): Promise<Doctor> {
    partialModel.addresses[0].streetName = streetName
      ? streetName
      : partialModel.addresses[0].streetName;
    partialModel.addresses[0].number = number
      ? number
      : partialModel.addresses[0].number;
    partialModel.addresses[0].neighbourhood = neighbourhood
      ? neighbourhood
      : partialModel.addresses[0].neighbourhood;
    partialModel.addresses[0].city = city
      ? city
      : partialModel.addresses[0].city;
    partialModel.addresses[0].state = state
      ? state
      : partialModel.addresses[0].state;
      partialModel.addresses[0].cep = cep
      ? cep
      : partialModel.addresses[0].cep;

    await this.ormRepository.save(partialModel);
    return partialModel;
  }

  async updateSecretPass(
    partialModel: Doctor,
    password: string
  ): Promise<Doctor> {
    partialModel.profile.password = password;
    await this.ormRepository.save(partialModel);
    return partialModel;
  }

  async update(
    partialModel: Doctor,
    name: string,
    cpf: number,
    dateOfBirth: Date,
    phoneNumber: number,
    avatar: string,
    rg: string,
  ): Promise<Doctor> {
    partialModel.profile.avatar = avatar ? avatar : partialModel.profile.avatar;
    partialModel.profile.name = name ? name : partialModel.profile.name;
    partialModel.profile.cpf_cnpj = cpf ? cpf : partialModel.profile.cpf_cnpj;
    partialModel.profile.rg = rg ? rg : partialModel.profile.rg;
    partialModel.profile.dateOfBirth = dateOfBirth ? dateOfBirth : partialModel.profile.dateOfBirth;
    partialModel.profile.phoneNumber = phoneNumber ? phoneNumber : partialModel.profile.phoneNumber;
    await this.ormRepository.save(partialModel);
    return partialModel;
  }
}
