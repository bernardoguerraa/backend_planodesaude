import Repository from "../../../database/repositories/Repository";
import Specialty from "../../../database/entities/Specialty";

interface SpecialtyRepository extends Repository<Specialty> {
  /**
   * Deletes a set of user permissions
   *
   * @param profileId user profile identifier
   * @param permissions an array of permissions to be deleted
   */

  getSpecialtyByName(specialtyId: string): Promise<Specialty>;
}

export default SpecialtyRepository;
