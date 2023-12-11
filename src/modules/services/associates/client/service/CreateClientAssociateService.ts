import { inject, injectable } from "tsyringe";
import BusinessRuleViolationError from "../../../../../shared/aplication/error/BusinessRuleViolationError";
import AuthenticationError from "../../../../../shared/aplication/error/AuthenticationError";
import Service from "../../../../../database/repositories/Services";
import ClientAssociate from "../../../../../database/entities/ClientAssociate";
import ClientAssociateRepository from "../../../repository/ClientAssociateRepository";
import Client from "../../../../../database/entities/Client";
import ClientRepository from "../../../../users/repository/ClientRepository";

interface CreateAssociateServiceParams {
  clientId: string;
  name: string;
  dateOfBirth: Date;
  phoneNumber: number;
  cpf: string;
  rg: string;
}

@injectable()
export default class CreateClientAssociateService
  implements Service<CreateAssociateServiceParams, ClientAssociate>
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
    cpf,
    dateOfBirth,
    name,
    phoneNumber,
    rg,
  }: CreateAssociateServiceParams): Promise<ClientAssociate> {
    const clinic = await this.clientRepository.findById(clientId);
    if (!clinic) {
      throw new BusinessRuleViolationError("Cliente não existe");
    }

    const associate = {
      name: name,
      client: { id: clientId } as Client,
      dateOfBirth: dateOfBirth,
      cpf: cpf,
      rg: rg,
      phoneNumber: phoneNumber,
    } as ClientAssociate;

    let newAssociate = await this.associateRepository.create(associate);

    return newAssociate;
  }
}
