import { inject, injectable } from "tsyringe";
import Model from "../../../../database/repositories/Model";
import SpecialtyRepository from "../../repository/SpecialtyRepository";
import Specialty from "../../../../database/entities/Specialty";
import Service from "../../../../database/repositories/Services";
import ProviderSpecialty from "../../../../database/entities/ProviderSpecialty";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
@injectable()
export class CreateSpecialtyService
  implements Service<Model<Specialty>, Specialty>
{
  private specialtyRepository: SpecialtyRepository;
  constructor(
    @inject("SpecialtyRepository")
    specialtyRepository: SpecialtyRepository
  ) {
    this.specialtyRepository = specialtyRepository;
  }
  async execute(): Promise<Specialty> {
    const newSpecialty = {
      name: "Oftalmo",
    } as Specialty;

    const specialty = await this.specialtyRepository.create(newSpecialty);

    return specialty;
  }
}
