import Client from "../../../database/entities/Client";
import AuthenticableEntityRepository from "../../../database/repositories/AutheticateRepository";
import Repository from "../../../database/repositories/Repository";

interface ClientRepository
  extends Repository<Client>,
    AuthenticableEntityRepository<Client> {
  findClient(): Promise<Client[]>;
  findById(id: string): Promise<Client>;
  findByCpf(cpf: number): Promise<Client>;
  update(
    partialModel: Client,
    name: string,
    cpf: number,
    dateOfBirth: Date,
    phoneNumber: number,
    avatar: string,
    rg: string
  ): Promise<Client>;
  updateAddress(
    partialModel: Client,
    streetName: string,
    number: number,
    neighbourhood: string,
    city: string,
    cep: number,
    state: string
  ): Promise<Client>;

  updateSecretPass(partialModel: Client, password: string): Promise<Client>;
}

export default ClientRepository;
