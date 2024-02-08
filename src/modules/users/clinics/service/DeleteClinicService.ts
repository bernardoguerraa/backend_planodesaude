import Clinic from "../../../../database/entities/Clinic";
import { inject, injectable } from "tsyringe";
import ClinicRepository from "../../repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";
import BusinessRuleViolationError from "../../../../shared/aplication/error/BusinessRuleViolationError";
interface DeleteClinicServiceParams {
  id: string;
}

@injectable()
export default class DeleteClinicService
  implements Service<DeleteClinicServiceParams, void>
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
  }: DeleteClinicServiceParams): Promise<void> {
    const existingClinic = await this.clinicRepository.findClinicById(id);
    if (!existingClinic) {
        throw new BusinessRuleViolationError("Clinica nao encontrada");
    }

    let updateClinic = await this.clinicRepository.delete(id);
    
    return updateClinic;
  }
}
