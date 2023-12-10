import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from "tsyringe";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import Model from "../../../../database/repositories/Model";
import UserPermissionsRepository from "../../repository/UserPermissionsRepository";
import DoctorRepository from "../../repository/DoctorRepository";
import UsersProfilesRepository from "../../repository/UsersProfilesRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
import SpecialtyRepository from "../../repository/SpecialtyRepository";
import ProviderSpecialtyRepository from "../../repository/ProviderSpecialtyRepository";
import ProviderSpecialty from "../../../../database/entities/ProviderSpecialty";
@injectable()
export class CreateDoctorService implements Service<Model<Doctor>, Doctor> {
  private permissionsRepository: UserPermissionsRepository;
  private doctorRepository: DoctorRepository;
  private usersProfilesRepository: UsersProfilesRepository;
  private specialtyRepository: SpecialtyRepository;
  private providerSpecialtyRepository: ProviderSpecialtyRepository;
  constructor(
    @inject("DoctorRepository")
    doctorRepository: DoctorRepository,
    @inject("UsersProfilesRepository")
    usersProfilesRepository: UsersProfilesRepository,
    @inject("PermissionsRepository")
    permissionsRepository: UserPermissionsRepository,
    @inject("SpecialtyRepository")
    specialtyRepository: SpecialtyRepository,
    @inject("ProviderSpecialtyRepository")
    providerSpecialtyRepository: ProviderSpecialtyRepository
  ) {
    this.doctorRepository = doctorRepository;
    this.usersProfilesRepository = usersProfilesRepository;
    this.permissionsRepository = permissionsRepository;
    this.specialtyRepository = specialtyRepository;
    this.providerSpecialtyRepository = providerSpecialtyRepository;
  }
  async execute(doctor: Model<Doctor>): Promise<Doctor> {
    const createHash = new BCryptJSHashProvider();

    const userSpecialtyList = (doctor as any).specialty;

    let specialtyList = [];
    await userSpecialtyList.forEach(async (element) => {
      let specialty = await this.specialtyRepository.getSpecialtyByName(
        element
      );

      specialtyList.push(specialty.id);
    });

    const [existingProfile] = await this.usersProfilesRepository.find({
      email: doctor.profile.email,
    });

    if (existingProfile) {
      throw new EntityPersistanceError("Este e-mail ja esta cadastrado!");
    }

    const treatedDoctor = { ...doctor };
    if (!existingProfile) {
      const encryptedPassword = await createHash.generateHash(
        doctor.profile.password
      );
      treatedDoctor.profile = await this.usersProfilesRepository.create({
        ...doctor.profile,
        password: encryptedPassword,
      });
    } else {
      treatedDoctor.profile = existingProfile;
    }

    const createDoctor = await this.doctorRepository.create(treatedDoctor);

    await specialtyList.forEach(async (element) => {
      await this.providerSpecialtyRepository.create({
        role: "doctor",
        profile: { id: treatedDoctor.profile.id },
        specialty: { id: element },
      } as ProviderSpecialty);
    });

    createDoctor.profile.permissions =
      await this.permissionsRepository.addUserPermissions(
        treatedDoctor.profile.id,
        [
          {
            accessType: "role",
            access: "doctor",
          },
        ]
      );

    return createDoctor;
  }
}
