import { inject, injectable } from "tsyringe";
import BusinessRuleViolationError from "../../../../../shared/aplication/error/BusinessRuleViolationError";
import AuthenticationError from "../../../../../shared/aplication/error/AuthenticationError";

import Service from "../../../../../database/repositories/Services";
import ClientAssociate from "../../../../../database/entities/ClientAssociate";
import ClientAssociateRepository from "../../../repository/ClientAssociateRepository";
import Client from "../../../../../database/entities/Client";
import ClientRepository from "../../../../users/repository/ClientRepository";
import UserProfile from "../../../../../database/entities/UserProfile";
import UserPermission from "../../../../../database/entities/UserPermission";
import UserPermissionsRepository from "../../../../users/repository/UserPermissionsRepository";
import UsersProfilesRepository from "../../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../../shared/aplication/error/EntityPersistanceError";
import BCryptJSHashProvider from "../../../../../shared/providers/HashProvider/BCryptJSHashProvider";
interface CreateAssociateServiceParams {
  clientId: string;
  name: string;
  dateOfBirth: Date;
  phoneNumber: number;
  cpf: number;
  rg: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateClientAssociateService
  implements Service<CreateAssociateServiceParams, ClientAssociate>
{
  private associateRepository: ClientAssociateRepository;
  private clientRepository: ClientRepository;
  private userProfileRepository: UsersProfilesRepository;
  private permissionsRepository: UserPermissionsRepository;
  constructor(
    @inject("ClientAssociateRepository")
    associateRepository: ClientAssociateRepository,

    @inject("ClientRepository")
    clientRepository: ClientRepository,
    @inject("UsersProfilesRepository")
    userProfileRepository: UsersProfilesRepository,
    @inject("PermissionsRepository")
    permissionsRepository: UserPermissionsRepository
  ) {
    this.associateRepository = associateRepository;
    this.clientRepository = clientRepository;
    this.userProfileRepository = userProfileRepository;
    this.permissionsRepository = permissionsRepository;
  }

  public async execute({
    clientId,
    cpf,
    dateOfBirth,
    name,
    phoneNumber,
    rg,
    email,
    password,
  }: CreateAssociateServiceParams): Promise<ClientAssociate> {
    const createHash = new BCryptJSHashProvider();

    const [existingProfile] = await this.userProfileRepository.find({
      email: email,
    });

    if (existingProfile) {
      throw new EntityPersistanceError("Este e-mail ja esta cadastrado!");
    }
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

    const encryptedPassword = await createHash.generateHash(password);

    const associate = {
      client: { id: clientId } as Client,
      profile: {
        name: name,
        dateOfBirth: dateOfBirth,
        cpf_cnpj: cpf,
        rg: rg,
        phoneNumber: phoneNumber,
        email: email,
        password: encryptedPassword,
      },
    } as ClientAssociate;

    let newAssociate = associate;

    newAssociate.profile = await this.userProfileRepository.create(
      associate.profile
    );

    const createAssociate = await this.associateRepository.create(newAssociate);

    createAssociate.profile.permissions =
      await this.permissionsRepository.addUserPermissions(
        newAssociate.profile.id,
        [
          {
            accessType: "role",
            access: "associate",
          },
        ]
      );

    return createAssociate;
  }
}
