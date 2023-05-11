import Client from '../../../database/entities/Client';
import AuthenticableEntityRepository from '../../../database/repositories/AutheticateRepository';
import Repository from '../../../database/repositories/Repository';

interface ClientRepository extends Repository<Client>,
  AuthenticableEntityRepository<Client> {
    findClient(): Promise<Client[]>;
  }

export default ClientRepository;
