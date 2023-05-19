import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from "tsyringe";
import BCryptJSHashProvider from "../../../../shared/providers/HashProvider/BCryptJSHashProvider";
import Model from "../../../../database/repositories/Model";
import UserPermissionsRepository from "../../repository/UserPermissionsRepository";
import DoctorRepository from "../../repository/DoctorRepository";
import UsersProfilesRepository from "../../repository/UsersProfilesRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
@injectable()
export class CreateDoctorService implements Service<Model<Doctor>, Doctor> {
  private permissionsRepository: UserPermissionsRepository;
  private doctorRepository: DoctorRepository;
  private usersProfilesRepository: UsersProfilesRepository;
  constructor(
    @inject("DoctorRepository")
    doctorRepository: DoctorRepository,
    @inject("UsersProfilesRepository")
    usersProfilesRepository: UsersProfilesRepository,
    @inject("PermissionsRepository")
    permissionsRepository: UserPermissionsRepository
  ) {
    this.doctorRepository = doctorRepository;
    this.usersProfilesRepository = usersProfilesRepository;
    this.permissionsRepository = permissionsRepository;
  }
  async execute(doctor: Model<Doctor>): Promise<Doctor> {
    const createHash = new BCryptJSHashProvider();

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
