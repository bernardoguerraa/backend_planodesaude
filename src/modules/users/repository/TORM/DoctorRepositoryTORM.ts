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
    const result = await this.ormRepository.createQueryBuilder('customers')
      .innerJoinAndSelect('customers.profile', 'profile')
      .leftJoinAndSelect('profile.permissions', 'permissions')
      .where('profile.email = :email AND permissions.isRevoked = false', { email })
      .getOne();

    return result;
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
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
