import ClinicAssociate from "../../../database/entities/ClinicAssociate";
import Repository from "../../../database/repositories/Repository";

interface ClinicAssociateRepository extends Repository<ClinicAssociate> {
  /**
   * Finds all associate for a given clinic
   *
   *
   * @param id clinic unique identifier
   */
  findById(id: string): Promise<ClinicAssociate>;
  updateAssociate(partialModel: ClinicAssociate): Promise<ClinicAssociate>;
}

export default ClinicAssociateRepository;
