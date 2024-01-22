import Client from "../../../../database/entities/Client";
import { inject, injectable } from "tsyringe";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import Model from "../../../../database/repositories/Model";
import UserPermissionsRepository from "../../repository/UserPermissionsRepository";
import ClientRepository from "../../repository/ClientRepository";
import UsersProfilesRepository from "../../repository/UsersProfilesRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
@injectable()
export class CreateClientService implements Service<Model<Client>, Client> {
  private permissionsRepository: UserPermissionsRepository;
  private clientRepository: ClientRepository;
  private usersProfilesRepository: UsersProfilesRepository;
  constructor(
    @inject("ClientRepository")
    clientRepository: ClientRepository,
    @inject("UsersProfilesRepository")
    usersProfilesRepository: UsersProfilesRepository,
    @inject("PermissionsRepository")
    permissionsRepository: UserPermissionsRepository
  ) {
    this.clientRepository = clientRepository;
    this.usersProfilesRepository = usersProfilesRepository;
    this.permissionsRepository = permissionsRepository;
  }
  async execute(client: Model<Client>): Promise<Client> {
    const createHash = new BCryptJSHashProvider();

    const [existingProfile] = await this.usersProfilesRepository.find({
      email: client.profile.email,
    });

    if (existingProfile) {
      throw new EntityPersistanceError("Este e-mail ja esta cadastrado!");
    }
    const [existingPhoneNumber] = await this.usersProfilesRepository.find({
      phoneNumber: client.profile.phoneNumber,
    });
    if (existingPhoneNumber) {
      throw new EntityPersistanceError("Este numero ja esta cadastrado!");
    }
    const [existingCPF] = await this.usersProfilesRepository.find({
      cpf_cnpj: client.profile.cpf_cnpj,
    });
    if (existingCPF) {
      throw new EntityPersistanceError("Este cpf ja esta cadastrado!");
    }

    const treatedClient = { ...client };
    if (!existingProfile) {
      const encryptedPassword = await createHash.generateHash(
        client.profile.password
      );
      treatedClient.profile = await this.usersProfilesRepository.create({
        ...client.profile,
        password: encryptedPassword,
      });
    } else {
      treatedClient.profile = existingProfile;
    }

    const createCliente = await this.clientRepository.create(treatedClient);

    createCliente.profile.permissions =
      await this.permissionsRepository.addUserPermissions(
        treatedClient.profile.id,
        [
          {
            accessType: "role",
            access: "client",
          },
        ]
      );

    return createCliente;
  }
}
