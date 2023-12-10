import Repository from "../../../database/repositories/Repository";
import ProviderSpecialty from "../../../database/entities/ProviderSpecialty";

interface ProviderSpecialtyRepository extends Repository<ProviderSpecialty> {
  /**
   * Deletes a set of user permissions
   *
   * @param profileId user profile identifier
   * @param permissions an array of permissions to be deleted
   */

  getByName(specialtyName: string): Promise<ProviderSpecialty[]>;
}

export default ProviderSpecialtyRepository;
