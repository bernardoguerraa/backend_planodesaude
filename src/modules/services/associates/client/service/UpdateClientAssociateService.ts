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
interface UpdateAssociateServiceParams {
  associateId: string;
  name: string;
  dateOfBirth: Date;
  phoneNumber: number;
  cpf: number;
  rg: string;
}

@injectable()
export default class UpdateClientAssociateService
  implements Service<UpdateAssociateServiceParams, ClientAssociate>
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
    associateId,
    cpf,
    dateOfBirth,
    name,
    phoneNumber,
    rg,
  }: UpdateAssociateServiceParams): Promise<ClientAssociate> {
    const clientAssociate = await this.associateRepository.findById(
      associateId
    );
    if (!clientAssociate) {
      throw new BusinessRuleViolationError("Associado não existe");
    }

    if (clientAssociate.profile.cpf_cnpj == cpf) {
      if (clientAssociate.profile.rg == rg) {
        if (clientAssociate.profile.phoneNumber == phoneNumber) {
          clientAssociate.profile.name = name
            ? name
            : clientAssociate.profile.name;
          clientAssociate.profile.cpf_cnpj = cpf
            ? cpf
            : clientAssociate.profile.cpf_cnpj;
          clientAssociate.profile.dateOfBirth = dateOfBirth
            ? dateOfBirth
            : clientAssociate.profile.dateOfBirth;
          clientAssociate.profile.phoneNumber = phoneNumber
            ? phoneNumber
            : clientAssociate.profile.phoneNumber;
          clientAssociate.profile.rg = rg ? rg : clientAssociate.profile.rg;

          let updatedAssociate = await this.associateRepository.updateAssociate(
            clientAssociate
          );

          return updatedAssociate;
        } else {
          const [existingPhoneNumber] = await this.userProfileRepository.find({
            phoneNumber: phoneNumber,
          });
          if (existingPhoneNumber) {
            throw new EntityPersistanceError("Este numero ja esta cadastrado!");
          }
        }
      } else {
        const [existingRg] = await this.userProfileRepository.find({
          rg: rg,
        });
        if (existingRg) {
          throw new EntityPersistanceError("Este rg ja esta cadastrado!");
        }
      }
    } else {
      const [existingCPF] = await this.userProfileRepository.find({
        cpf_cnpj: cpf,
      });
      if (existingCPF) {
        throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
      }

      clientAssociate.profile.name = name ? name : clientAssociate.profile.name;
      clientAssociate.profile.cpf_cnpj = cpf
        ? cpf
        : clientAssociate.profile.cpf_cnpj;
      clientAssociate.profile.dateOfBirth = dateOfBirth
        ? dateOfBirth
        : clientAssociate.profile.dateOfBirth;
      clientAssociate.profile.phoneNumber = phoneNumber
        ? phoneNumber
        : clientAssociate.profile.phoneNumber;
      clientAssociate.profile.rg = rg ? rg : clientAssociate.profile.rg;

      let updatedAssociate = await this.associateRepository.updateAssociate(
        clientAssociate
      );

      return updatedAssociate;
    }
  }
}
