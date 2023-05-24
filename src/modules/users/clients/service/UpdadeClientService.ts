import Client from "../../../../database/entities/Client";
import { inject, injectable } from "tsyringe";
import ClientRepository from "../../repository/ClientRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateClientsServiceParams {
  id: string;
  name: string;
  cpf: string;
  phoneNumber: number;
  dateOfBirth: Date;
}

@injectable()
export class UpdateClientsService
  implements Service<UpdateClientsServiceParams, Client>
{
  private clientRepository: ClientRepository;
  constructor(
    @inject("ClientRepository")
    clientRepository: ClientRepository
  ) {
    this.clientRepository = clientRepository;
  }
  async execute({
    id,
    name,
    cpf,
    dateOfBirth,
    phoneNumber,
  }: UpdateClientsServiceParams): Promise<Client> {
    const existingProfile = await this.clientRepository.findById(id);
    if (!existingProfile) {
      throw new EntityPersistanceError("Usuario não encontrado");
    }

    const updateClient = await this.clientRepository.update(
      existingProfile,
      name,
      cpf,
      dateOfBirth,
      phoneNumber
    );
    console.log(updateClient);
    return updateClient;
  }
}
