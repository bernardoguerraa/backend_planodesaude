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
  async findByCpf(cpf: number): Promise<Client> {
    const result = await this.ormRepository
      .createQueryBuilder("clients")
      .innerJoinAndSelect("clients.profile", "profile")
      .leftJoinAndSelect("profile.permissions", "permissions")
      .where("profile.cpf = :cpf AND permissions.isRevoked = false", {
        cpf,
      })
      .getOne();

    const client = await this.ormRepository.findOne({
      where: { id: result?.id },
    });
    return client;
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const result = await this.ormRepository
      .createQueryBuilder("clients")
      .innerJoinAndSelect("clients.profile", "profile")
      .leftJoinAndSelect("profile.permissions", "permissions")
      .where("profile.email = :email AND permissions.isRevoked = false", {
        email,
      })
      .getOne();

    const client = await this.ormRepository.findOne({
      where: { id: result?.id },
    });
    return client;
  }

  async findClient(): Promise<Client[]> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  async findById(id: string): Promise<Client> {
    const customer = await this.ormRepository.findOne({ where: { id: id } });
    return customer;
  }

  async create(model: Model<Client>): Promise<Client> {
    let customer = this.ormRepository.create(model);
    customer = await this.ormRepository.save(customer);

    return customer;
  }

  updateById(id: string, partialModel: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(
    partialModel: Client,
    name: string,
    cpf: string,
    dateOfBirth: Date,
    phoneNumber: number,
    avatar: string,
    rg: string
  ): Promise<Client> {
    partialModel.profile.avatar = avatar ? avatar : partialModel.profile.avatar;
    partialModel.profile.name = name ? name : partialModel.profile.name;
    partialModel.profile.cpf_cnpj = cpf ? cpf : partialModel.profile.cpf_cnpj;
    partialModel.profile.rg = rg ? rg : partialModel.profile.rg;
    partialModel.profile.dateOfBirth = dateOfBirth
      ? dateOfBirth
      : partialModel.profile.dateOfBirth;
    partialModel.profile.phoneNumber = phoneNumber
      ? phoneNumber
      : partialModel.profile.phoneNumber;

    await this.ormRepository.save(partialModel);
    return partialModel;
  }
  async updateAddress(
    partialModel: Client,
    streetName: string,
    number: number,
    neighbourhood: string,
    city: string,
    state: string
  ): Promise<Client> {
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
    partialModel: Client,
    password: string
  ): Promise<Client> {
    partialModel.profile.password = password;
    await this.ormRepository.save(partialModel);
    return partialModel;
  }
  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
