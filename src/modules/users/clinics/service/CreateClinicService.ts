import Clinic from '../../../../database/entities/Clinic';
import { inject, injectable } from 'tsyringe';
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import Model from "../../../../database/repositories/Model";
import UserPermissionsRepository from "../../repository/UserPermissionsRepository";
import ClinicRepository from '../../repository/ClinicRepository';
import UsersProfilesRepository from "../../repository/UsersProfilesRepository";
import Service from '../../../../database/repositories/Services';
@injectable()
export class CreateClinicService
 implements Service<Model<Clinic>, Clinic>{

     private permissionsRepository: UserPermissionsRepository;
     private clinicRepository:ClinicRepository;
     private usersProfilesRepository: UsersProfilesRepository;
    constructor(
        @inject('ClinicRepository')
            clinicRepository: ClinicRepository,
        @inject('UsersProfilesRepository')
            usersProfilesRepository:UsersProfilesRepository,
        @inject('PermissionsRepository')
            permissionsRepository: UserPermissionsRepository, 
    ){
        this.clinicRepository=clinicRepository;
        this.usersProfilesRepository=usersProfilesRepository;
        this.permissionsRepository=permissionsRepository;
    }
    async execute(clinic: Model<Clinic>):Promise<Clinic>{
     
        
        const createHash = new BCryptJSHashProvider;

        
        
        const [existingProfile] = await this.usersProfilesRepository.find(
            {
                email: clinic.profile.email
            }
        );
        
    if(existingProfile){
        throw new Error ('Este e-mail ja esta cadastrado!')
    }
       
    
    console.log("ta chegando aqui?");
            
    const treatedClininc = { ...clinic };
        if(!existingProfile){

            const encryptedPassword = await createHash.generateHash(clinic.profile.password);
            treatedClininc.profile= await this.usersProfilesRepository.create( {
                ...clinic.profile,
                password:encryptedPassword,
            });
        }else{
            treatedClininc.profile = existingProfile;
        }
        console.log(treatedClininc.profile.id);
        const createClinic= await this.clinicRepository.create(treatedClininc);
    
     
        createClinic.profile.permissions= await this.permissionsRepository.addUserPermissions(
            treatedClininc.profile.id,[{
                accessType: 'role',
                access: 'Clinic',
            }]
        );
        
        console.log(createClinic);
        return createClinic;
    }
}