import { Repository, getRepository, In } from "typeorm";

import SpecialtyRepository from "../SpecialtyRepository";
import Specialty from "../../../../database/entities/Specialty";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";

export default class SpecialtyRepositoryTORM implements SpecialtyRepository {
  private ormRepository: Repository<Specialty>;

  constructor() {
    this.ormRepository = getRepository(Specialty);
  }

  async find(filters: Filters<Specialty>): Promise<Specialty[]> {
    const permissions = await this.ormRepository.find(filters);

    return permissions;
  }
  async getSpecialtyByName(name: string): Promise<Specialty> {
    const [result] = await this.ormRepository.find({ where: { name: name } });
    return result;
  }
  async create(model: Model<Specialty>): Promise<Specialty> {
    const userPermission = this.ormRepository.create(model);
    const createdPermission = await this.ormRepository.save(userPermission);

    return createdPermission;
  }

  updateById(id: string, partialModel: Specialty): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
