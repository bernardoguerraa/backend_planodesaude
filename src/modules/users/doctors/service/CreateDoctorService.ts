import Doctor from '../../../../database/entities/Doctor';
import { inject, injectable } from 'tsyringe';
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import Model from "../../../../database/repositories/Model";
import UserPermissionsRepository from "../../repository/UserPermissionsRepository";
import DoctorRepository from '../../repository/DoctorRepository';
import UsersProfilesRepository from "../../repository/UsersProfilesRepository";
import Service from '../../../../database/repositories/Services';
@injectable()
export class CreateDoctorService
 implements Service<Model<Doctor>, Doctor>{

     private permissionsRepository: UserPermissionsRepository;
     private doctorRepository:DoctorRepository;
     private usersProfilesRepository: UsersProfilesRepository;
    constructor(
        @inject('DoctorRepository')
        doctorRepository: DoctorRepository,
        @inject('UsersProfilesRepository')
            usersProfilesRepository:UsersProfilesRepository,
        @inject('PermissionsRepository')
            permissionsRepository: UserPermissionsRepository, 
    ){
        this.doctorRepository=doctorRepository;
        this.usersProfilesRepository=usersProfilesRepository;
        this.permissionsRepository=permissionsRepository;
    }
    async execute(doctor: Model<Doctor>):Promise<Doctor>{
     
        
        const createHash = new BCryptJSHashProvider;

        
        
        const [existingProfile] = await this.usersProfilesRepository.find(
            {
                email: doctor.profile.email
            }
        );
        
    if(existingProfile){
        throw new Error ('Este e-mail ja esta cadastrado!')
    }
       
    
    console.log("ta chegando aqui?");
            
    const treatedDoctor = { ...doctor };
        if(!existingProfile){

            const encryptedPassword = await createHash.generateHash(doctor.profile.password);
            treatedDoctor.profile= await this.usersProfilesRepository.create( {
                ...doctor.profile,
                password:encryptedPassword,
            });
        }else{
            treatedDoctor.profile = existingProfile;
        }
        console.log(treatedDoctor.profile.id);
        const createDoctor = await this.doctorRepository.create(treatedDoctor);
    
     
        createDoctor.profile.permissions= await this.permissionsRepository.addUserPermissions(
            treatedDoctor.profile.id,[{
                accessType: 'role',
                access: 'doctor',
            }]
        );
        
        console.log(createDoctor);
        return createDoctor;
    }
}