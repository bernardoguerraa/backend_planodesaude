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
  cpf: string;
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

    if (clientAssociate.cpf == cpf) {
      if (clientAssociate.rg == rg) {
        if (clientAssociate.phoneNumber == phoneNumber) {
          clientAssociate.name = name ? name : clientAssociate.name;
          clientAssociate.cpf = cpf ? cpf : clientAssociate.cpf;
          clientAssociate.dateOfBirth = dateOfBirth
            ? dateOfBirth
            : clientAssociate.dateOfBirth;
          clientAssociate.phoneNumber = phoneNumber
            ? phoneNumber
            : clientAssociate.phoneNumber;
          clientAssociate.rg = rg ? rg : clientAssociate.rg;

          let updatedAssociate = await this.associateRepository.updateAssociate(
            clientAssociate
          );

          return updatedAssociate;
        } else {
          const [existingPhoneNumberAssociate] =
            await this.associateRepository.find({
              phoneNumber: phoneNumber,
            });
          if (existingPhoneNumberAssociate) {
            throw new EntityPersistanceError("Este numero ja esta cadastrado!");
          }
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
        const [existingRgAssociate] = await this.associateRepository.find({
          rg: rg,
        });
        if (existingRgAssociate) {
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

      const [existingCPFAssociate] = await this.associateRepository.find({
        cpf: cpf,
      });
      if (existingCPFAssociate) {
        throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
      }
    }

    clientAssociate.name = name ? name : clientAssociate.name;
    clientAssociate.cpf = cpf ? cpf : clientAssociate.cpf;
    clientAssociate.dateOfBirth = dateOfBirth
      ? dateOfBirth
      : clientAssociate.dateOfBirth;
    clientAssociate.phoneNumber = phoneNumber
      ? phoneNumber
      : clientAssociate.phoneNumber;
    clientAssociate.rg = rg ? rg : clientAssociate.rg;

    let updatedAssociate = await this.associateRepository.updateAssociate(
      clientAssociate
    );

    return updatedAssociate;
  }
}
