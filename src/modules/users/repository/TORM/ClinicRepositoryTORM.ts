/* eslint-disable quotes */
import ClinicRepository from "../ClinicRepository";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import { getRepository, Repository as ORMRepository } from "typeorm";
import Clinic from "../../../../database/entities/Clinic";

export default class ClinicRepositoryTORM implements ClinicRepository {
  private ormRepository: ORMRepository<Clinic>;

  constructor() {
    this.ormRepository = getRepository(Clinic);
  }
  async find(filters: Filters<Clinic>): Promise<Clinic[]> {
    const clinic = await this.ormRepository.find(filters);

    return clinic;
  }
  async findClinicById(clinicId: string): Promise<Clinic> {
    const clinic = await this.ormRepository.findOne({
      where: { id: clinicId },
    });
    return clinic;
  }
  async findByEmail(email: string): Promise<Clinic | undefined> {
    const result = await this.ormRepository
      .createQueryBuilder("clinics")
      .innerJoinAndSelect("clinics.profile", "profile")
      .leftJoinAndSelect("profile.permissions", "permissions")
      .where("profile.email = :email AND permissions.isRevoked = false", {
        email,
      })
      .getOne();

    const clinic = await this.ormRepository.findOne({
      where: { id: result?.id },
    });

    return clinic;
  }

  async findClinic(): Promise<Clinic[]> {
    const clinic = await this.ormRepository.find();
    return clinic;
  }

  async create(model: Model<Clinic>): Promise<Clinic> {
    let customer = this.ormRepository.create(model);
    customer = await this.ormRepository.save(customer);

    return customer;
  }

  updateById(id: string, partialModel: Clinic): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async update(
    partialModel: Clinic,
    name: string,
    cpf: string,
    dateOfBirth: Date,
    phoneNumber: number,
    avatar: string,
    rg: string,
  ): Promise<Clinic> {
    partialModel.profile.avatar = avatar ? avatar : partialModel.profile.avatar;
    partialModel.profile.name = name ? name : partialModel.profile.name;
    partialModel.profile.cpf_cnpj = cpf ? cpf : partialModel.profile.cpf_cnpj;
    partialModel.profile.rg = rg ? rg : partialModel.profile.rg;
    partialModel.profile.dateOfBirth = dateOfBirth ? dateOfBirth : partialModel.profile.dateOfBirth;
    partialModel.profile.phoneNumber = phoneNumber ? phoneNumber : partialModel.profile.phoneNumber;
    await this.ormRepository.save(partialModel);
    return partialModel;
  }

  async updateAddress(
    partialModel: Clinic,
    streetName: string,
    number: number,
    neighbourhood: string,
    city: string,
    state: string
  ): Promise<Clinic> {
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

    await this.ormRepository.save(partialModel);
    return partialModel;
  }

  async updateSecretPass(
    partialModel: Clinic,
    password: string
  ): Promise<Clinic> {
    partialModel.profile.password = password;
    await this.ormRepository.save(partialModel);
    return partialModel;
  }
}
