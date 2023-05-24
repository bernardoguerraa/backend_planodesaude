import Associate from "../../../database/entities/Associate";
import Repository from "../../../database/repositories/Repository";

interface AssociateRepository extends Repository<Associate> {
  /**
   * Finds all associate for a given clinic
   *
   *
   * @param id clinic unique identifier
   */
  findById(id: string): Promise<Associate>;
  updateAssociate(partialModel: Associate): Promise<Associate>;
}

export default AssociateRepository;
