import Doctor from "../../../database/entities/Doctor";
import AuthenticableEntityRepository from "../../../database/repositories/AutheticateRepository";
import Repository from "../../../database/repositories/Repository";

interface DoctorRepository
  extends Repository<Doctor>,
    AuthenticableEntityRepository<Doctor> {
  findDoctor(): Promise<Doctor[]>;
  findDoctorById(doctorid: string): Promise<Doctor>;
  updateAddress(
    partialModel: Doctor,
    streetName: string,
    number: number,
    neighbourhood: string,
    city: string,
    state: string,
    cep: number,
  ): Promise<Doctor>;
  updateSecretPass(partialModel: Doctor, password: string): Promise<Doctor>;
}

export default DoctorRepository;
