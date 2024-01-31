import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from "tsyringe";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import DoctorRepository from "../../repository/DoctorRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateDoctorServiceParams {
    id: string;
    password: string;
  }
  
  @injectable()
  export class UpdateDoctorSecretPassService
    implements Service<UpdateDoctorServiceParams, Doctor>
  {
    private doctorRepository: DoctorRepository;
    constructor(
      @inject("DoctorRepository")
      doctorRepository: DoctorRepository
    ) {
      this.doctorRepository = doctorRepository;
    }
    async execute({ id, password }: UpdateDoctorServiceParams): Promise<Doctor> {
      const createHash = new BCryptJSHashProvider();
      const existingProfile = await this.doctorRepository.findDoctorById(id);
      if (!existingProfile) {
        throw new EntityPersistanceError("Usuario não encontrado");
      }
  
      const encryptedPassword = await createHash.generateHash(password);
  
      const updateDoctor = await this.doctorRepository.updateSecretPass(
        existingProfile,
        encryptedPassword
      );
  
      return updateDoctor;
    }
  }