import { inject, injectable } from "tsyringe";
import BusinessRuleViolationError from "../../../../shared/aplication/error/BusinessRuleViolationError";
import Service from "../../../../database/repositories/Services";

import ClientAssociateRepository from "../../repository/ClientAssociateRepository";
import ClientRepository from "../../../users/repository/ClientRepository";
import UsersProfilesRepository from "../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
import ActivitiesRepository from "../../repository/ActivitiesRepository";
import Activity from "../../../../database/entities/Activity";
import UserProfile from "../../../../database/entities/UserProfile";
import ClinicRepository from "../../../users/repository/ClinicRepository";
import Client from "../../../../database/entities/Client";
import Clinic from "../../../../database/entities/Clinic";
import DoctorRepository from "../../../users/repository/DoctorRepository";
interface GetActivityServiceParams {
  clientId: string;
}

@injectable()
export default class GetActivitesByClientIdService
  implements Service<GetActivityServiceParams, Activity[]>
{
  private activitiesRepository: ActivitiesRepository;
  private clientRepository: ClientRepository;

  constructor(
    @inject("ActivitiesRepository")
    activitiesRepository: ActivitiesRepository,
    @inject("ClientRepository")
    clientRepository: ClientRepository
  ) {
    this.clientRepository = clientRepository;
    this.activitiesRepository = activitiesRepository;
  }

  public async execute({
    clientId,
  }: GetActivityServiceParams): Promise<Activity[]> {
    const existingAssociate = await this.clientRepository.findById(clientId);
    if (!existingAssociate) {
      throw new EntityPersistanceError("Esse cliente não existe!");
    }
    const getActivity = await this.activitiesRepository.findByClientId(
      clientId
    );

    return getActivity;
  }
}
