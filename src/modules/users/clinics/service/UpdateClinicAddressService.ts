import Clinic from "../../../../database/entities/Clinic";
import { inject, injectable } from "tsyringe";
import ClinicRepository from "../../repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateClinicServiceParams {
  id: string;
  streetName: string;
  number: number;
  city: string;
  state: string;
  neighbourhood: string;
}

@injectable()
export class UpdateClinicAddressService
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
    city,
    neighbourhood,
    number,
    state,
    streetName,
  }: UpdateClinicServiceParams): Promise<Clinic> {
    const existingProfile = await this.clinicRepository.findClinicById(id);
    if (!existingProfile) {
      throw new EntityPersistanceError("Usuario não encontrado");
    }

    const updateClinic = await this.clinicRepository.updateAddress(
      existingProfile,
      streetName,
      number,
      neighbourhood,
      city,
      state
    );

    return updateClinic;
  }
}
