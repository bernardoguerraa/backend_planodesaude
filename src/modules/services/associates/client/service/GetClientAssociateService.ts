import { inject, injectable } from "tsyringe";
import BusinessRuleViolationError from "../../../../../shared/aplication/error/BusinessRuleViolationError";
import AuthenticationError from "../../../../../shared/aplication/error/AuthenticationError";
import Service from "../../../../../database/repositories/Services";
import ClientAssociate from "../../../../../database/entities/ClientAssociate";
import ClientAssociateRepository from "../../../repository/ClientAssociateRepository";
import Client from "../../../../../database/entities/Client";
import ClientRepository from "../../../../users/repository/ClientRepository";
import UserProfile from "../../../../../database/entities/UserProfile";
import UsersProfilesRepository from "../../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../../shared/aplication/error/EntityPersistanceError";
interface GetAssociateServiceParams {
  clientId: string;
}

@injectable()
export default class GetClientAssociateService
  implements Service<GetAssociateServiceParams, ClientAssociate[]>
{
  private associateRepository: ClientAssociateRepository;
  private clientRepository: ClientRepository;

  constructor(
    @inject("ClientAssociateRepository")
    associateRepository: ClientAssociateRepository,
    @inject("ClientRepository")
    clientRepository: ClientRepository
  ) {
    this.associateRepository = associateRepository;
    this.clientRepository = clientRepository;
  }

  public async execute({
    clientId,
  }: GetAssociateServiceParams): Promise<ClientAssociate[]> {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new BusinessRuleViolationError("Cliente não existe");
    }

    const clientAssociates =
      await this.associateRepository.findAllClientAssociates(clientId);

    return clientAssociates;
  }
}
