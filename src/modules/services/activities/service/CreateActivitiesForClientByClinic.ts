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
interface CreateActivityServiceParams {
  providerId: string;
  patientCpf: number;
  profissionalName: string;
  price: number;
  date: Date;
  specialty: string;
  medical_procedure: string;
}

@injectable()
export default class CreateActivitiesForClientByClinic
  implements Service<CreateActivityServiceParams, Activity>
{
  private clientRepository: ClientRepository;
  private userProfileRepository: UsersProfilesRepository;
  private activitiesRepository: ActivitiesRepository;
  private clinicRepository: ClinicRepository;
  constructor(
    @inject("ClientRepository")
    clientRepository: ClientRepository,
    @inject("UsersProfilesRepository")
    userProfileRepository: UsersProfilesRepository,
    @inject("ActivitiesRepository")
    activitiesRepository: ActivitiesRepository,
    @inject("ClinicRepository")
    clinicRepository: ClinicRepository
  ) {
    this.clientRepository = clientRepository;
    this.userProfileRepository = userProfileRepository;
    this.activitiesRepository = activitiesRepository;
    this.clinicRepository = clinicRepository;
  }

  public async execute({
    date,
    patientCpf,
    price,
    profissionalName,
    providerId,
    specialty,
    medical_procedure
  }: CreateActivityServiceParams): Promise<Activity> {
    const [existingProfile] = await this.clinicRepository.find({
      id: providerId,
    });

    if (!existingProfile) {
      throw new EntityPersistanceError("Esse provedor não existe!");
    }

    const existingClient = await this.clientRepository.findByCpf(patientCpf);
    if (!existingClient) {
      throw new EntityPersistanceError("Esse cliente não existe!");
    }
    const newActivity = {
      date: date,
      patientCpf: patientCpf,
      price: price,
      specialty: specialty,
      profissionalName: profissionalName,
      provider: { id: existingProfile.profile.id },
      client: { id: existingClient.id } as Client,
      medical_procedure: medical_procedure,
    } as Activity;

    const createActivity = await this.activitiesRepository.create(newActivity);

    return createActivity;
  }
}
