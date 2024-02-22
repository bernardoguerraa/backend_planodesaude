import Client from "../../../../database/entities/Client";
import { inject, injectable } from "tsyringe";
import ClientRepository from "../../repository/ClientRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateClientsServiceParams {
  id: string;
  streetName: string;
  cep: number;
  number: number;
  city: string;
  state: string;
  neighbourhood: string;
}

@injectable()
export class UpdateClientAddressService
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
    city,
    neighbourhood,
    number,
    state,
    streetName,
    cep,
  }: UpdateClientsServiceParams): Promise<Client> {
    const existingProfile = await this.clientRepository.findById(id);
    if (!existingProfile) {
      throw new EntityPersistanceError("Usuario não encontrado");
    }

    const updateClient = await this.clientRepository.updateAddress(
      existingProfile,
      streetName,
      number,
      neighbourhood,
      city,
      cep,
      state
    );

    return updateClient;
  }
}
