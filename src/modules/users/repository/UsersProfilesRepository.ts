import UserProfile from "../../../database/entities/UserProfile";
import Repository from "../../../database/repositories/Repository";

interface UsersProfilesRepository extends Repository<UserProfile> {
  findUser(email: string): Promise<UserProfile>;
  findUserByCpf(cpf: number): Promise<UserProfile>;
  findUserById(userId: string): Promise<UserProfile>;
  findUserByCnpj(cnpj: number):Promise<UserProfile>;
}

export default UsersProfilesRepository;
