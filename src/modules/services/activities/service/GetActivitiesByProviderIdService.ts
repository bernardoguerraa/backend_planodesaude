import { inject, injectable } from "tsyringe";
import Service from "../../../../database/repositories/Services";
import UsersProfilesRepository from "../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
import ActivitiesRepository from "../../repository/ActivitiesRepository";
import Activity from "../../../../database/entities/Activity";

interface GetActivityServiceParams {
  providerId: string;
}

@injectable()
export default class GetActivitiesByProviderIdService
  implements Service<GetActivityServiceParams, Activity[]>
{
  private activitiesRepository: ActivitiesRepository;
  private userProfileRepository: UsersProfilesRepository;

  constructor(
    @inject("ActivitiesRepository")
    activitiesRepository: ActivitiesRepository,
    @inject("UsersProfilesRepository")
    userProfileRepository: UsersProfilesRepository
  ) {
    this.userProfileRepository = userProfileRepository;
    this.activitiesRepository = activitiesRepository;
  }

  public async execute({
    providerId,
  }: GetActivityServiceParams): Promise<Activity[]> {
    const existingAssociate = await this.userProfileRepository.findUserById(
      providerId
    );
    if (!existingAssociate) {
      throw new EntityPersistanceError("Esse cliente não existe");
    }
    const getActivity = await this.activitiesRepository.findByProviderId(
      providerId
    );

    return getActivity;
  }
}
