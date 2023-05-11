import { Request, Response} from "express";
import Client from "../../../../database/entities/Client";
import { clientContainer } from "../../../../shared/aplication/tsyringe/containers/authentication";
import { CreateClientService } from "../service/CreateClientService";
import { GetClientByIdService } from "../service/GetClientByIdService";
import { GetClientsService } from "../service/GetClientsService";
export default class ClientController{

    static async createClient(
         request:Request,
         response:Response):Promise<Response>{

            const {email, password, addresses,
                   cpf, rg, dateOfBirth, phoneNumber
                   , name} = request.body;
            const createClientService = clientContainer.resolve(CreateClientService);

            let client = await createClientService.execute
            ({
                profile: {
                    name,
                    email,
                    password,
                    dateOfBirth,
                    phoneNumber,
                    cpf,
                },
                addresses
            } as unknown as Client);
           
            
            if (client instanceof Error){

                return response.status(400).json(client.message);
    
            }
    
            return response.status(201).json(client); 
         }



        static async getClientsById(
            request: Request,
            response: Response
          ): Promise<Response> {
            const { id } = request.params;
        
            const getClientsService = clientContainer.resolve(GetClientByIdService);
        
            const client = await getClientsService.execute({ id });
        
            return response.status(200).json(client);
          }

          static async getClients(
            request: Request,
            response: Response
          ): Promise<Response> {
         

        
            const getClientsService = clientContainer.resolve(GetClientsService);
        
            const clients = await getClientsService.execute();
        
            return response.status(200).json(clients);
          }
}