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
  private userProfileRepository: UsersProfilesRepository;

  constructor(
    @inject("ClientAssociateRepository")
    associateRepository: ClientAssociateRepository,

    @inject("ClientRepository")
    clientRepository: ClientRepository,
    @inject("UsersProfilesRepository")
    userProfileRepository: UsersProfilesRepository
  ) {
    this.associateRepository = associateRepository;
    this.clientRepository = clientRepository;
    this.userProfileRepository = userProfileRepository;
  }

  public async execute({
    clientId,
    cpf,
    dateOfBirth,
    name,
    phoneNumber,
    rg,
  }: CreateAssociateServiceParams): Promise<ClientAssociate> {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new BusinessRuleViolationError("Cliente não existe");
    }

    const [existingPhoneNumber] = await this.userProfileRepository.find({
      phoneNumber: phoneNumber,
    });
    if (existingPhoneNumber) {
      throw new EntityPersistanceError("Este numero ja esta cadastrado!");
    }
    const [existingCPF] = await this.userProfileRepository.find({
      cpf_cnpj: cpf,
    });
    if (existingCPF) {
      throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
    }

    const [existingRg] = await this.userProfileRepository.find({
      rg: rg,
    });
    if (existingRg) {
      throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
    }
    const [existingPhoneNumberAssociate] = await this.associateRepository.find({
      phoneNumber: phoneNumber,
    });
    if (existingPhoneNumberAssociate) {
      throw new EntityPersistanceError("Este numero ja esta cadastrado!");
    }
    const [existingCPFAssociate] = await this.associateRepository.find({
      cpf: cpf,
    });
    if (existingCPFAssociate) {
      throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
    }

    const [existingRgAssociate] = await this.associateRepository.find({
      rg: rg,
    });
    if (existingRgAssociate) {
      throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
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
