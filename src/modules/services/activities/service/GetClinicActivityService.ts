import { inject, injectable } from "tsyringe";
import Clinic from "../../../../database/entities/Clinic";
import ClinicRepository from "../../../users/repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";

type GetClinicActivity = {
    cnpj: number;
};

@injectable()
export class GetClinicActivityService
    implements Service<GetClinicActivity, Clinic>{

        private clinicRepository: ClinicRepository;
        constructor(
            @inject('ClinicRepository')
                clinicRepository: ClinicRepository,
        ){
            this.clinicRepository=clinicRepository;
        }

        async execute ({cnpj}: GetClinicActivity):Promise<Clinic>{

            const existingProfile = await this.clinicRepository.findClinicByCnpj(cnpj);            

            return existingProfile;
        }
}