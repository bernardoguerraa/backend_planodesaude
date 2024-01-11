import Clinic from "../../../database/entities/Clinic";
import AuthenticableEntityRepository from "../../../database/repositories/AutheticateRepository";
import Repository from "../../../database/repositories/Repository";

interface ClinicRepository
  extends Repository<Clinic>,
    AuthenticableEntityRepository<Clinic> {
  findClinic(): Promise<Clinic[]>;
  findClinicById(clinicId: string): Promise<Clinic>;
  update(
    partialModel: Clinic,
    name: string,
    cpf: string,
    dateOfBirth: Date,
    phoneNumber: number,
    avatar: string,
    rg: string,
    specialty: string,
  ): Promise<Clinic>;
}

export default ClinicRepository;
