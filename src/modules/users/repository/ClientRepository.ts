import Client from "../../../database/entities/Client";
import AuthenticableEntityRepository from "../../../database/repositories/AutheticateRepository";
import Repository from "../../../database/repositories/Repository";

interface ClientRepository
  extends Repository<Client>,
    AuthenticableEntityRepository<Client> {
  findClient(): Promise<Client[]>;
  findById(id: string): Promise<Client>;
  update(
    partialModel: Client,
    name: string,
    cpf: string,
    dateOfBirth: Date,
    phoneNumber: number
  ): Promise<Client>;
  updateAddress(
    partialModel: Client,
    streetName: string,
    number: number,
    neighbourhood: string,
    city: string,
    state: string
  ): Promise<Client>;

  updateSecretPass(partialModel: Client, password: string): Promise<Client>;
}

export default ClientRepository;
