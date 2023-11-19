import { inject, injectable } from "tsyringe";
import BusinessRuleViolationError from "../../../../shared/aplication/error/BusinessRuleViolationError";
import AuthenticationError from "../../../../shared/aplication/error/AuthenticationError";
import Service from "../../../../database/repositories/Services";
import Associate from "../../../../database/entities/Associate";
import Clinic from "../../../../database/entities/Clinic";
import AssociateRepository from "../../repository/AssociateRepository";
import ClinicRepository from "../../../users/repository/ClinicRepository";

interface CreateAssociateServiceParams {
  clinicId: string;
  name: string;
  regionalCouncilNumber: string;
  regionalCouncil: string;
  dateOfBirth: Date;
  specialty: string;
}

@injectable()
export default class CreateAssociateService
  implements Service<CreateAssociateServiceParams, Associate>
{
  private associateRepository: AssociateRepository;
  private clinicRepository: ClinicRepository;

  constructor(
    @inject("AssociateRepository")
    associateRepository: AssociateRepository,

    @inject("ClinicRepository")
    clinicRepository: ClinicRepository
  ) {
    this.associateRepository = associateRepository;
    this.clinicRepository = clinicRepository;
  }

  public async execute({
    clinicId,
    dateOfBirth,
    name,
    regionalCouncil,
    regionalCouncilNumber,
    specialty,
  }: CreateAssociateServiceParams): Promise<Associate> {
    const clinic = await this.clinicRepository.findClinicById(clinicId);
    if (!clinic) {
      throw new BusinessRuleViolationError("Clinica não existe");
    }

    const associate = {
      name: name,
      clinic: { id: clinicId } as Clinic,
      dateOfBirth: dateOfBirth,
      regionalCouncil: regionalCouncil,
      regionalCouncilNumber: regionalCouncilNumber,
      specialty: specialty,
    } as Associate;

    let newAssociate = await this.associateRepository.create(associate);

    return newAssociate;
  }
}
