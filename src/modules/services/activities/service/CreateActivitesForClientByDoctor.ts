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
interface CreateActivityServiceParams {
  providerId: string;
  patientCpf: number;
  profissionalName: string;
  price: number;
  date: Date;
  specialty: string;
}

@injectable()
export default class CreateActivitesForClientByDoctor
  implements Service<CreateActivityServiceParams, Activity>
{
  private clientRepository: ClientRepository;
  private activitiesRepository: ActivitiesRepository;
  private doctorRepository: DoctorRepository;

  constructor(
    @inject("ClientRepository")
    clientRepository: ClientRepository,
    @inject("ActivitiesRepository")
    activitiesRepository: ActivitiesRepository,
    @inject("DoctorRepository")
    doctorRepository: DoctorRepository
  ) {
    this.clientRepository = clientRepository;
    this.activitiesRepository = activitiesRepository;
    this.doctorRepository = doctorRepository;
  }

  public async execute({
    date,
    patientCpf,
    price,
    profissionalName,
    providerId,
    specialty,
  }: CreateActivityServiceParams): Promise<Activity> {
    const [existingProfile] = await this.doctorRepository.find({
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
    } as Activity;

    const createActivity = await this.activitiesRepository.create(newActivity);

    return createActivity;
  }
}
