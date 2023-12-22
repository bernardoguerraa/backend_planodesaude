import Clinic from "../../../../database/entities/Clinic";
import { inject, injectable } from "tsyringe";
import ClinicRepository from "../../repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";

@injectable()
export class GetClinicsService implements Service<Clinic, Clinic[]> {
  private clinicRepository: ClinicRepository;
  constructor(
    @inject("ClinicRepository")
    clinicRepository: ClinicRepository
  ) {
    this.clinicRepository = clinicRepository;
  }
  async execute(): Promise<Clinic[]> {
    const existingProfile = await this.clinicRepository.findClinic();

    return existingProfile;
  }
}
