import Clinic from "../../../../database/entities/Clinic";
import { inject, injectable } from "tsyringe";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import ClinicRepository from "../../repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateClinicServiceParams {
  id: string;
  password: string;
}

@injectable()
export class UpdateClinicSecretPassService
  implements Service<UpdateClinicServiceParams, Clinic>
{
  private clinicRepository: ClinicRepository;
  constructor(
    @inject("ClinicRepository")
    clinicRepository: ClinicRepository
  ) {
    this.clinicRepository = clinicRepository;
  }
  async execute({ id, password }: UpdateClinicServiceParams): Promise<Clinic> {
    const createHash = new BCryptJSHashProvider();
    const existingProfile = await this.clinicRepository.findClinicById(id);
    if (!existingProfile) {
      throw new EntityPersistanceError("Usuario não encontrado");
    }

    const encryptedPassword = await createHash.generateHash(password);

    const updateClinic = await this.clinicRepository.updateSecretPass(
      existingProfile,
      encryptedPassword
    );

    return updateClinic;
  }
}
