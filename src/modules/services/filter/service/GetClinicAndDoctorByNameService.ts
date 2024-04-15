import { injectable, inject } from "tsyringe";
import Service from "../../../../database/repositories/Services";
import UserProfile from "../../../../database/entities/UserProfile";
import UsersProfilesRepository from "../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";

interface GetName {
  name: string;
}

@injectable()
export class GetClinicAndDoctorByNameService
  implements Service<GetName, UserProfile[]>
{
  private userProfileRepository: UsersProfilesRepository;
  
  constructor(
    @inject("UsersProfilesRepository")
    userProfileRepository: UsersProfilesRepository,
  ) {
    this.userProfileRepository = userProfileRepository;
  }
  
  async execute({ name }: GetName): Promise<UserProfile[]> {
    
    const existingProfile = await this.userProfileRepository.findUserByName(name);

    if (!existingProfile) {
        throw new EntityPersistanceError("A pesquisa não encontrou resultados");
    }

    return existingProfile;
  }
}