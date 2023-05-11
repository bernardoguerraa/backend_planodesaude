import ClientRepository from "../../../../modules/users/repository/ClientRepository";
import ClientRepositoryTORM from "../../../../modules/users/repository/TORM/ClientRepositoryTORM";
import UsersProfilesRepository from "../../../../modules/users/repository/UsersProfilesRepository";
import UsersProfilesRepositoryTORM from "../../../../modules/users/repository/TORM/UsersProfilesRepositoryTORM";
import DoctorRepository from "../../../../modules/users/repository/DoctorRepository";
import DoctorRepositoryTORM from "../../../../modules/users/repository/TORM/DoctorRepositoryTORM";
import ClinicRepository from "../../../../modules/users/repository/ClinicRepository";
import ClinicRepositoryTORM from "../../../../modules/users/repository/TORM/ClinicRepositoryTORM";
import {
    clientContainer,
    clinicContainer,
    doctorContainer,
    usersContainer} from '../containers/authentication';

export default function registerAuthentication(): void {
        clientContainer.registerSingleton<ClientRepository>(
          'AuthenticationRepository',
          ClientRepositoryTORM
        );      
         
        doctorContainer.registerSingleton<DoctorRepository>(
          'AuthenticationRepository',
          DoctorRepositoryTORM
        );  
        clinicContainer.registerSingleton<ClinicRepository>(
          'AuthenticationRepository',
          ClinicRepositoryTORM
        );   
        usersContainer.registerSingleton<UsersProfilesRepository>(
          'AuthenticationRepository',
          UsersProfilesRepositoryTORM
        ); 
} 