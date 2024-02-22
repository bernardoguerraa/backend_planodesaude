import Clinic from "../../../../database/entities/Clinic";
import Doctor from "../../../../database/entities/Doctor";
import DoctorRepository from "../../../users/repository/DoctorRepository";
import ClinicRepository from "../../../users/repository/ClinicRepository";
import UserProfile from "../../../../database/entities/UserProfile";
import UsersProfilesRepository from "../../../users/repository/UsersProfilesRepository";

import { inject, injectable } from "tsyringe";
import Service from "../../../../database/repositories/Services";

interface GetProfile {
  userEmail: string;
}

@injectable()
export class GetProfileByEmailService
  implements Service<GetProfile, Doctor | Clinic>
{
  private usersProfilesRepository: UsersProfilesRepository;
  private clinicRepository: ClinicRepository;
  private doctorRepository: DoctorRepository;
  constructor(
    @inject("UsersProfilesRepository")
    usersProfilesRepository: UsersProfilesRepository,
    @inject("ClinicRepository")
    clinicRepository: ClinicRepository,
    @inject("DoctorRepository")
    doctorRepository: DoctorRepository
  ) {
    this.usersProfilesRepository = usersProfilesRepository;
    this.clinicRepository = clinicRepository;
    this.doctorRepository = doctorRepository;
  }
  async execute({ userEmail }: GetProfile): Promise<Doctor | Clinic> {
    const result = await this.usersProfilesRepository.findUser(userEmail);
    if (result.permissions[0].access == "doctor") {
      const doctor = await this.doctorRepository.findByEmail(result.email);
      return doctor;
    } else {
      const clinic = await this.clinicRepository.findByEmail(result.email);
      return clinic;
    }
  }
}
