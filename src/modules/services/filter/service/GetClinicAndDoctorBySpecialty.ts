import ProviderSpecialty from "../../../../database/entities/ProviderSpecialty";
import ProviderSpecialtyRepository from "../../../users/repository/ProviderSpecialtyRepository";
import SpecialtyRepository from "../../../users/repository/SpecialtyRepository";
import { inject, injectable } from "tsyringe";

import Service from "../../../../database/repositories/Services";

interface GetProviderSpecialty {
  specialtyName: string;
}

@injectable()
export class GetClinicAndDoctorBySpecialtyService
  implements Service<GetProviderSpecialty, ProviderSpecialty[]>
{
  private providerSpecialtyRepository: ProviderSpecialtyRepository;
  private specialtyRepository: SpecialtyRepository;
  constructor(
    @inject("ProviderSpecialtyRepository")
    providerSpecialtyRepository: ProviderSpecialtyRepository,

    @inject("SpecialtyRepository")
    specialtyRepository: SpecialtyRepository
  ) {
    this.providerSpecialtyRepository = providerSpecialtyRepository;
    this.specialtyRepository = specialtyRepository;
  }
  async execute({
    specialtyName,
  }: GetProviderSpecialty): Promise<ProviderSpecialty[]> {
    const specialty = await this.specialtyRepository.getSpecialtyByName(
      specialtyName
    );

    const result = await this.providerSpecialtyRepository.getByName(
      specialty.id
    );

    return result;
  }
}
