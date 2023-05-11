import { Request, Response} from "express";
import Clinic from "../../../../database/entities/Clinic";
import { clinicContainer } from "../../../../shared/aplication/tsyringe/containers/authentication";
import { CreateClinicService } from "../service/CreateClinicService";
export default class ClinicController{

    static async createClinic(
         request:Request,
         response:Response):Promise<Response>{

            const {email, password, addresses,
                   cpf,dateOfBirth, phoneNumber
                   , name,specialty} = request.body;
            const createClinicService = clinicContainer.resolve(CreateClinicService);

            let clinic = await createClinicService.execute
            ({
                profile: {
                    name,
                    email,
                    password,
                    dateOfBirth,
                    phoneNumber,
                    cpf,
                },
                addresses, specialty
            } as unknown as Clinic);
           
            
            if (clinic instanceof Error){

                return response.status(400).json(clinic.message);
    
            }
    
            return response.status(201).json(clinic); 
         }

}