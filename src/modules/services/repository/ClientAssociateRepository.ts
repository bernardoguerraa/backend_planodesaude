import ClientAssociate from "../../../database/entities/ClientAssociate";
import Repository from "../../../database/repositories/Repository";

interface ClientAssociateRepository extends Repository<ClientAssociate> {
  /**
   * Finds all associate for a given clinic
   *
   *
   * @param id clinic unique identifier
   */
  findById(id: string): Promise<ClientAssociate>;
  findAllClientAssociates(clientId: string): Promise<ClientAssociate[]>;
  updateAssociate(partialModel: ClientAssociate): Promise<ClientAssociate>;
}

export default ClientAssociateRepository;
