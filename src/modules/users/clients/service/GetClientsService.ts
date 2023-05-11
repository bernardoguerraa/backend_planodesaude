import Client from '../../../../database/entities/Client';
import { inject, injectable } from 'tsyringe';
import ClientRepository from "../../repository/ClientRepository";
import Service from '../../../../database/repositories/Services';


  
@injectable()
export class GetClientsService
 implements Service<Client, Client[]>{

     private clientRepository:ClientRepository;
    constructor(
        @inject('ClientRepository')
            clientRepository: ClientRepository,
    ){
        this.clientRepository=clientRepository;
    }
    async execute():Promise<Client[]>{

        const existingProfile = await this.clientRepository.findClient();
        
        return existingProfile;
    }
}