import Client from '../../../../database/entities/Client';
import { inject, injectable } from 'tsyringe';
import ClientRepository from "../../repository/ClientRepository";
import Service from '../../../../database/repositories/Services';

type GetClient = {
    id: string;
  };
  
@injectable()
export class GetClientByIdService
 implements Service<Client, Client[]>{

     private clientRepository:ClientRepository;
    constructor(
        @inject('ClientRepository')
            clientRepository: ClientRepository,
    ){
        this.clientRepository=clientRepository;
    }
    async execute({id}:GetClient):Promise<Client[]>{

        const existingProfile = await this.clientRepository.find(
            {
                id:id
            }
        );
        
        return existingProfile;
    }
}