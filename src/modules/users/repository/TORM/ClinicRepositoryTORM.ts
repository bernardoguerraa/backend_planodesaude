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
    const customers = await this.ormRepository.find(filters);

    return customers;
  }

  async findByEmail(email: string): Promise<Clinic | undefined> {
    const result = await this.ormRepository.createQueryBuilder('customers')
      .innerJoinAndSelect('customers.profile', 'profile')
      .leftJoinAndSelect('profile.permissions', 'permissions')
      .where('profile.email = :email AND permissions.isRevoked = false', { email })
      .getOne();

    return result;
  }

  async findClinic(): Promise<Clinic[]> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  async create(model: Model<Clinic>): Promise<Clinic> {
    let customer = this.ormRepository.create(model);
    customer = await this.ormRepository.save(customer);

    return customer;
  }

  updateById(id: string, partialModel: Clinic): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}