import UserProfile from '../../../database/entities/UserProfile';
import Repository from '../../../database/repositories/Repository';

interface UsersProfilesRepository extends  Repository<UserProfile>{
    findUser(email:string): Promise<UserProfile>;
}


export default UsersProfilesRepository;
