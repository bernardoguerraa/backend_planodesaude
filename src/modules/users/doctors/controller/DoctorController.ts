import { Request, Response} from "express";
import Doctor from "../../../../database/entities/Doctor";
import { doctorContainer } from "../../../../shared/aplication/tsyringe/containers/authentication";
import { CreateDoctorService } from "../service/CreateDoctorService";
import AuthenticateService from "../../authenticate/service/AuthenticateService";





export default class DoctorController{
    static async createDoctor(
        request:Request,
        response:Response):Promise<Response>{

           const {email, password, addresses, cpf,
                 rg, dateOfBirth, phoneNumber, name,
                 regionalCouncilNumber, regionalCouncil, specialty} = request.body;
           const doctorClientService = doctorContainer.resolve(CreateDoctorService);

           let doctor = await doctorClientService.execute
           ({
               profile: {
                   name,
                   email,
                   password,
                   dateOfBirth,
                   phoneNumber,
                   cpf,
               },
               addresses, regionalCouncil, regionalCouncilNumber, specialty
           } as unknown as Doctor);
          
           
           if (doctor instanceof Error){

               return response.status(400).json(doctor.message);
   
           }
   
           return response.status(201).json(doctor); 
        }


        static async authenticate(
            request: Request,
            response: Response
          ): Promise<Response> {
            
              const { email, password } = request.body;
        
              const authenticateBarberService = doctorContainer.resolve(
                AuthenticateService
              );
           
          
              const {agent, token}= await authenticateBarberService.execute({
                email,
                password,
              });
             
              return response.status(200).json({ agent, token});
          }
}