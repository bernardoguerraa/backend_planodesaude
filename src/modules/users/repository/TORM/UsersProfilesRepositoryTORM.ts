import UsersProfilesRepository from '../UsersProfilesRepository';
import Filters from '../../../../database/repositories/Filter';
import Model from '../../../../database/repositories/Model';
import { getRepository, Repository } from 'typeorm';
import UserProfile from '../../../../database/entities/UserProfile';

export default class UsersProfilesRepositoryTORM
implements UsersProfilesRepository {
  private ormRepository: Repository<UserProfile>;

  constructor() {
    this.ormRepository = getRepository(UserProfile);
  }

  async find(filters: Filters<UserProfile>): Promise<UserProfile[]> {
    const userProfile = await this.ormRepository.find({
      where: filters,
    });

    return userProfile;
  }
  async findByEmail(email: string): Promise<UserProfile| undefined> {
    const result = await this.ormRepository
      .createQueryBuilder("users_profiles")
      .leftJoinAndSelect("users_profiles.permissions", "permissions")
      .where("email = :email AND permissions.isRevoked = false", {
        email,
      })
      .getOne();

    return result;
  }

  async findUser(email:string): Promise<UserProfile> {
    const result = await this.ormRepository.findOne({where:{email:email}});
    return result;
  }
  async create(model: Model<UserProfile>): Promise<UserProfile> {
    let userProfile = this.ormRepository.create(model);
    userProfile = await this.ormRepository.save(userProfile);

    return userProfile;
  }

  async updateById(id: string, partialModel: UserProfile): Promise<void> {
    await this.ormRepository.update(id, partialModel);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
