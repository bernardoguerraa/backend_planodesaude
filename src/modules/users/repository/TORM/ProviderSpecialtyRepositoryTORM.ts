import { Repository, getRepository, In } from "typeorm";

import SpecialtyRepository from "../SpecialtyRepository";
import Specialty from "../../../../database/entities/Specialty";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import ProviderSpecialty from "../../../../database/entities/ProviderSpecialty";
import ProviderSpecialtyRepository from "../ProviderSpecialtyRepository";

export default class ProviderSpecialtyRepositoryTORM
  implements ProviderSpecialtyRepository
{
  private ormRepository: Repository<ProviderSpecialty>;

  constructor() {
    this.ormRepository = getRepository(ProviderSpecialty);
  }

  async find(
    filters: Filters<ProviderSpecialty>
  ): Promise<ProviderSpecialty[]> {
    const permissions = await this.ormRepository.find(filters);

    return permissions;
  }
  async getByName(specialtyId: string): Promise<ProviderSpecialty[]> {
    const result = await this.ormRepository.find({
      where: { specialty: { id: specialtyId } },
    });
    return result;
  }
  async create(model: Model<ProviderSpecialty>): Promise<ProviderSpecialty> {
    const userPermission = this.ormRepository.create(model);
    const createdPermission = await this.ormRepository.save(userPermission);

    return createdPermission;
  }

  updateById(id: string, partialModel: ProviderSpecialty): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
