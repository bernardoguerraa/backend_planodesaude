import Clinic from "../../../../database/entities/Clinic";
import { inject, injectable } from "tsyringe";
import ProviderSpecialty from "../../../../database/entities/ProviderSpecialty";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import Model from "../../../../database/repositories/Model";
import UserPermissionsRepository from "../../repository/UserPermissionsRepository";
import ClinicRepository from "../../repository/ClinicRepository";
import UsersProfilesRepository from "../../repository/UsersProfilesRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
import ProviderSpecialtyRepository from "../../repository/ProviderSpecialtyRepository";
import SpecialtyRepository from "../../repository/SpecialtyRepository";
@injectable()
export class CreateClinicService implements Service<Model<Clinic>, Clinic> {
  private permissionsRepository: UserPermissionsRepository;
  private clinicRepository: ClinicRepository;
  private usersProfilesRepository: UsersProfilesRepository;
  private specialtyRepository: SpecialtyRepository;
  private providerSpecialtyRepository: ProviderSpecialtyRepository;
  constructor(
    @inject("ClinicRepository")
    clinicRepository: ClinicRepository,
    @inject("UsersProfilesRepository")
    usersProfilesRepository: UsersProfilesRepository,
    @inject("PermissionsRepository")
    permissionsRepository: UserPermissionsRepository,
    @inject("SpecialtyRepository")
    specialtyRepository: SpecialtyRepository,
    @inject("ProviderSpecialtyRepository")
    providerSpecialtyRepository: ProviderSpecialtyRepository
  ) {
    this.clinicRepository = clinicRepository;
    this.usersProfilesRepository = usersProfilesRepository;
    this.permissionsRepository = permissionsRepository;
    this.specialtyRepository = specialtyRepository;
    this.providerSpecialtyRepository = providerSpecialtyRepository;
  }
  async execute(clinic: Model<Clinic>): Promise<Clinic> {
    const createHash = new BCryptJSHashProvider();
    const userSpecialtyList = (clinic as any).specialty;

    let specialtyList = [];
    await userSpecialtyList.forEach(async (element) => {
      let specialty = await this.specialtyRepository.getSpecialtyByName(
        element
      );
      specialtyList.push(specialty.id);
    });

    const [existingProfile] = await this.usersProfilesRepository.find({
      email: clinic.profile.email,
    });

    if (existingProfile) {
      throw new EntityPersistanceError("Este e-mail ja esta cadastrado!");
    }

    const treatedClininc = { ...clinic };
    if (!existingProfile) {
      const encryptedPassword = await createHash.generateHash(
        clinic.profile.password
      );
      treatedClininc.profile = await this.usersProfilesRepository.create({
        ...clinic.profile,
        password: encryptedPassword,
      });
    } else {
      treatedClininc.profile = existingProfile;
    }

    const createClinic = await this.clinicRepository.create(treatedClininc);

    await specialtyList.forEach(async (element) => {
      await this.providerSpecialtyRepository.create({
        role: "doctor",
        profile: { id: treatedClininc.profile.id },
        specialty: { id: element },
      } as ProviderSpecialty);
    });

    createClinic.profile.permissions =
      await this.permissionsRepository.addUserPermissions(
        treatedClininc.profile.id,
        [
          {
            accessType: "role",
            access: "clinic",
          },
        ]
      );

    return createClinic;
  }
}
