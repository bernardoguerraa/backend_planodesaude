import { container } from "tsyringe";

import ClientRepository from "../../../../modules/users/repository/ClientRepository";
import ClientRepositoryTORM from "../../../../modules/users/repository/TORM/ClientRepositoryTORM";
import UserPermissionsRepository from "../../../../modules/users/repository/UserPermissionsRepository";
import UserPermissionsRepositoryTORM from "../../../../modules/users/repository/TORM/UserPermissionsRepositoryTORM";
import UsersProfilesRepository from "../../../../modules/users/repository/UsersProfilesRepository";
import UsersProfilesRepositoryTORM from "../../../../modules/users/repository/TORM/UsersProfilesRepositoryTORM";
import DoctorRepository from "../../../../modules/users/repository/DoctorRepository";
import DoctorRepositoryTORM from "../../../../modules/users/repository/TORM/DoctorRepositoryTORM";
import ClinicRepository from "../../../../modules/users/repository/ClinicRepository";
import ClinicRepositoryTORM from "../../../../modules/users/repository/TORM/ClinicRepositoryTORM";

export default function registerRepositories(): void {

container.register<ClientRepository>(
    'ClientRepository',
    ClientRepositoryTORM
);

container.register<DoctorRepository>(
    'DoctorRepository',
    DoctorRepositoryTORM
);

container.register<ClinicRepository>(
    'ClinicRepository',
    ClinicRepositoryTORM
);
container.register<UserPermissionsRepository>(
    'PermissionsRepository',
    UserPermissionsRepositoryTORM
);

container.register<UsersProfilesRepository>(
    'UsersProfilesRepository',
    UsersProfilesRepositoryTORM
);
}