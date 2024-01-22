import Repository from "../../../database/repositories/Repository";
import Activity from "../../../database/entities/Activity";
interface ActivitiesRepository extends Repository<Activity> {
  /**
   * Finds all associate for a given clinic
   *
   *
   * @param id clinic unique identifier
   */
}

export default ActivitiesRepository;
