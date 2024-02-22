import { Repository, getRepository } from "typeorm";
import ClinicAssociateRepository from "../ClinicAssociateRepository";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import ClinicAssociate from "../../../../database/entities/ClinicAssociate";
import P from "pino";

export default class ClinicAssociateRepositoryTORM
  implements ClinicAssociateRepository
{
  private ormRepository: Repository<ClinicAssociate>;

  constructor() {
    this.ormRepository = getRepository(ClinicAssociate);
  }

  async find(filters: Filters<ClinicAssociate>): Promise<ClinicAssociate[]> {
    const repositories = await this.ormRepository.find({
      where: filters,
    });

    return repositories;
  }

  async findById(id: string): Promise<ClinicAssociate> {
    const [findAssocaiteServiceById] = await this.ormRepository.find({
      where: {
        id: id,
      },
    });

    return findAssocaiteServiceById;
  }

  async create(model: Model<ClinicAssociate>): Promise<ClinicAssociate> {
    let associate = this.ormRepository.create(model);
    associate = await this.ormRepository.save(associate);

    return associate;
  }

  async updateAssociate(
    partialModel: ClinicAssociate
  ): Promise<ClinicAssociate> {
    return partialModel;
  }

  async updateById(id: string, partialModel: ClinicAssociate): Promise<void> {
    await this.ormRepository.update(id, partialModel);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
