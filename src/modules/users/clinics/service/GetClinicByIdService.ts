import Clinic from '../../../../database/entities/Clinic';
import { inject, injectable } from 'tsyringe';
import ClinicRepository from "../../repository/ClinicRepository";
import Service from '../../../../database/repositories/Services';

type GetClinic = {
    id: string;
  };
  
@injectable()
export class GetClinicByIdService
 implements Service<Clinic, Clinic[]>{

     private clinicRepository:ClinicRepository;
    constructor(
        @inject('ClinicRepository')
            clinicRepository: ClinicRepository,
    ){
        this.clinicRepository=clinicRepository;
    }
    //execute recebe objeto do tipo GetClinic e retorna uma Promise de um array de objetos do tipo Clinic
    //o metood find do clinicRepository busca clinicas com o id especificado
    async execute({id}:GetClinic):Promise<Clinic[]>{

        const existingProfile = await this.clinicRepository.find(
            {
                id:id
            }
        );
        
        return existingProfile;
    }
}