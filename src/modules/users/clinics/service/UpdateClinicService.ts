import Clinic from "../../../../database/entities/Clinic";
import { inject, injectable } from "tsyringe";
import ClinicRepository from "../../repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateClinicServiceParams {
  id: string;
  name: string;
  cpf: number;
  rg: string;
  phoneNumber: number;
  dateOfBirth: Date;
  avatar: string;
}

@injectable()
export class UpdateClinicService
  implements Service<UpdateClinicServiceParams, Clinic>
{
  private clinicRepository: ClinicRepository;
  constructor(
    @inject("ClinicRepository")
    clinicRepository: ClinicRepository
  ) {
    this.clinicRepository = clinicRepository;
  }
  async execute({
    id,
    name,
    cpf,
    dateOfBirth,
    phoneNumber,
    avatar,
    rg,
  }: UpdateClinicServiceParams): Promise<Clinic> {
    const existingProfile = await this.clinicRepository.findClinicById(id);
    if (!existingProfile) {
      throw new EntityPersistanceError("Usuario não encontrado");
    }

    const updateClinic = await this.clinicRepository.update(
      existingProfile,
      name,
      cpf,
      dateOfBirth,
      phoneNumber,
      avatar,
      rg,
    );
    return updateClinic;
  }
}
