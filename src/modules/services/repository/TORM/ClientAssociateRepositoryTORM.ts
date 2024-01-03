import { Repository, getRepository } from "typeorm";
import ClientAssociateRepository from "../ClientAssociateRepository";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import ClientAssociate from "../../../../database/entities/ClientAssociate";
import P from "pino";

export default class ClientAssociateRepositoryTORM
  implements ClientAssociateRepository
{
  private ormRepository: Repository<ClientAssociate>;

  constructor() {
    this.ormRepository = getRepository(ClientAssociate);
  }

  async find(filters: Filters<ClientAssociate>): Promise<ClientAssociate[]> {
    const repositories = await this.ormRepository.find({
      where: filters,
    });

    return repositories;
  }

  async findById(id: string): Promise<ClientAssociate> {
    const [findAssocaiteServiceById] = await this.ormRepository.find({
      where: {
        id: id,
      },
    });

    return findAssocaiteServiceById;
  }
  async findAllClientAssociates(clientId: string): Promise<ClientAssociate[]> {
    const associates = await this.ormRepository.find({
      where: { client: { id: clientId } },
    });
    return associates;
  }

  async create(model: Model<ClientAssociate>): Promise<ClientAssociate> {
    let associate = this.ormRepository.create(model);
    associate = await this.ormRepository.save(associate);

    return associate;
  }

  async updateAssociate(
    partialModel: ClientAssociate
  ): Promise<ClientAssociate> {
    const updatedAssociate = await this.ormRepository.save(partialModel);
    return updatedAssociate;
  }

  async updateById(id: string, partialModel: ClientAssociate): Promise<void> {
    await this.ormRepository.update(id, partialModel);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
