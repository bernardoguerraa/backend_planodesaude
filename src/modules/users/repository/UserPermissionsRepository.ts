import UserPermission from '../../../database/entities/UserPermission';
import Repository from '../../../database/repositories/Repository';

interface UserPermissionsRepository extends Repository<UserPermission> {
  /**
   * Deletes a set of user permissions
   *
   * @param profileId user profile identifier
   * @param permissions an array of permissions to be deleted
   */
  deleteUserPermissions(
    profileId: string,
    permissions: string[]
  ): Promise<void>;

  /**
   * Adds a set of user permissions
   *
   * @param profileId user profile identifier
   * @param permissions an array of permissions to be deleted
   */
  addUserPermissions(
    profileId: string,
    permissions: { accessType: 'role' | 'permission', access: string }[]
  ): Promise<UserPermission[]>;
}

export default UserPermissionsRepository;
