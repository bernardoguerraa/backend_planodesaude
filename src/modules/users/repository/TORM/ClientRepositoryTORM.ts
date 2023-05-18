/* eslint-disable quotes */
import ClientRepository from "../ClientRepository";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import { getRepository, Repository as ORMRepository } from "typeorm";
import Client from "../../../../database/entities/Client";

export default class ClientRepositoryTORM implements ClientRepository {
  private ormRepository: ORMRepository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }
  async find(filters: Filters<Client>): Promise<Client[]> {
    const customers = await this.ormRepository.find(filters);

    return customers;
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const result = await this.ormRepository.createQueryBuilder('clients')
      .innerJoinAndSelect('clients.profile', 'profile')
      .leftJoinAndSelect('profile.permissions', 'permissions')
      .where('profile.email = :email AND permissions.isRevoked = false', { email })
      .getOne();

    const client = await this.ormRepository.findOne({where:{id:result.id}})
    return client;
  }

  async findClient(): Promise<Client[]> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  async create(model: Model<Client>): Promise<Client> {
    let customer = this.ormRepository.create(model);
    customer = await this.ormRepository.save(customer);

    return customer;
  }

  updateById(id: string, partialModel: Client): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
