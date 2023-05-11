import Clinic from '../../../database/entities/Clinic';
import AuthenticableEntityRepository from '../../../database/repositories/AutheticateRepository';
import Repository from '../../../database/repositories/Repository';

interface ClinicRepository extends Repository<Clinic>,
  AuthenticableEntityRepository<Clinic> {
    findClinic(): Promise<Clinic[]>;
  }

export default ClinicRepository;
