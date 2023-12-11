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
import ClinicAssociateRepository from "../../../../modules/services/repository/ClinicAssociateRepository";
import ClinicAssociateRepositoryTORM from "../../../../modules/services/repository/TORM/ClinicAssociateRepositoryTORM";
import ClientAssociateRepository from "../../../../modules/services/repository/ClientAssociateRepository";
import ClientAssociateRepositoryTORM from "../../../../modules/services/repository/TORM/ClientAssociateRepositoryTORM";
import SpecialtyRepository from "../../../../modules/users/repository/SpecialtyRepository";
import SpecialtyRepositoryTORM from "../../../../modules/users/repository/TORM/SpecialtyRepositoryTORM";
import ProviderSpecialtyRepository from "../../../../modules/users/repository/ProviderSpecialtyRepository";
import ProviderSpecialtyRepositoryTORM from "../../../../modules/users/repository/TORM/ProviderSpecialtyRepositoryTORM";
export default function registerRepositories(): void {
  container.register<ClientRepository>(
    "ClientRepository",
    ClientRepositoryTORM
  );

  container.register<DoctorRepository>(
    "DoctorRepository",
    DoctorRepositoryTORM
  );

  container.register<ClinicRepository>(
    "ClinicRepository",
    ClinicRepositoryTORM
  );
  container.register<UserPermissionsRepository>(
    "PermissionsRepository",
    UserPermissionsRepositoryTORM
  );

  container.register<UsersProfilesRepository>(
    "UsersProfilesRepository",
    UsersProfilesRepositoryTORM
  );

  container.register<ClinicAssociateRepository>(
    "ClinicAssociateRepository",
    ClinicAssociateRepositoryTORM
  );

  container.register<ClientAssociateRepository>(
    "ClientAssociateRepository",
    ClientAssociateRepositoryTORM
  );

  container.register<SpecialtyRepository>(
    "SpecialtyRepository",
    SpecialtyRepositoryTORM
  );

  container.register<ProviderSpecialtyRepository>(
    "ProviderSpecialtyRepository",
    ProviderSpecialtyRepositoryTORM
  );
}
