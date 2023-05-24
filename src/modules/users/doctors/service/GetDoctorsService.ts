import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from "tsyringe";
import DoctorRepository from "../../repository/DoctorRepository";
import Service from "../../../../database/repositories/Services";

@injectable()
export class GetDoctorsService implements Service<Doctor, Doctor[]> {
  private doctorRepository: DoctorRepository;
  constructor(
    @inject("ClientRepository")
    doctorRepository: DoctorRepository
  ) {
    this.doctorRepository = doctorRepository;
  }
  async execute(): Promise<Doctor[]> {
    const existingProfile = await this.doctorRepository.findDoctor();

    return existingProfile;
  }
}
