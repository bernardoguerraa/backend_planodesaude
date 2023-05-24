import { Repository, getRepository } from "typeorm";
import AssociateRepository from "../AssociateRepository";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import Associate from "../../../../database/entities/Associate";
import P from "pino";

export default class AssociateRepositoryTORM implements AssociateRepository {
  private ormRepository: Repository<Associate>;

  constructor() {
    this.ormRepository = getRepository(Associate);
  }

  async find(filters: Filters<Associate>): Promise<Associate[]> {
    const repositories = await this.ormRepository.find({
      where: filters,
    });

    return repositories;
  }

  async findById(id: string): Promise<Associate> {
    const [findAssocaiteServiceById] = await this.ormRepository.find({
      where: {
        id: id,
      },
    });

    return findAssocaiteServiceById;
  }

  async create(model: Model<Associate>): Promise<Associate> {
    let associate = this.ormRepository.create(model);
    associate = await this.ormRepository.save(associate);

    return associate;
  }

  async updateAssociate(partialModel: Associate): Promise<Associate> {
    return partialModel;
  }

  async updateById(id: string, partialModel: Associate): Promise<void> {
    await this.ormRepository.update(id, partialModel);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
