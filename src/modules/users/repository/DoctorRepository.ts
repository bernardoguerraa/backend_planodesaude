
import Doctor from '../../../database/entities/Doctor';
import AuthenticableEntityRepository from '../../../database/repositories/AutheticateRepository';
import Repository from '../../../database/repositories/Repository';

interface DoctorRepository extends Repository<Doctor>,
  AuthenticableEntityRepository<Doctor> {
    findDoctor(): Promise<Doctor[]>;
  }

export default DoctorRepository;
