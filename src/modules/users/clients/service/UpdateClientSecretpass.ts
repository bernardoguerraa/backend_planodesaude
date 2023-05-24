import Client from "../../../../database/entities/Client";
import { inject, injectable } from "tsyringe";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import ClientRepository from "../../repository/ClientRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateClientsServiceParams {
  id: string;
  password: string;
}

@injectable()
export class UpdateClientSecretPassService
  implements Service<UpdateClientsServiceParams, Client>
{
  private clientRepository: ClientRepository;
  constructor(
    @inject("ClientRepository")
    clientRepository: ClientRepository
  ) {
    this.clientRepository = clientRepository;
  }
  async execute({ id, password }: UpdateClientsServiceParams): Promise<Client> {
    const createHash = new BCryptJSHashProvider();
    const existingProfile = await this.clientRepository.findById(id);
    if (!existingProfile) {
      throw new EntityPersistanceError("Usuario não encontrado");
    }

    const encryptedPassword = await createHash.generateHash(password);

    const updateClient = await this.clientRepository.updateSecretPass(
      existingProfile,
      encryptedPassword
    );

    return updateClient;
  }
}
