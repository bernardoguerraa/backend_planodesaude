import { Repository, getRepository, In } from 'typeorm';

import UserPermissionsRepository from '../UserPermissionsRepository';
import Filters from '../../../../database/repositories/Filter';
import Model from '../../../../database/repositories/Model';
import UserPermission from '../../../../database/entities/UserPermission';

export default class UserPermissionsRepositoryTORM
implements UserPermissionsRepository {
  private ormRepository: Repository<UserPermission>;

  constructor() {
    this.ormRepository = getRepository(UserPermission);
  }

  async find(filters: Filters<UserPermission>): Promise<UserPermission[]> {
    const permissions = await this.ormRepository.find(filters);

    return permissions;
  }

  async create(model: Model<UserPermission>): Promise<UserPermission> {
    const userPermission = this.ormRepository.create(model);
    const createdPermission = await this.ormRepository.save(userPermission);

    return createdPermission;
  }

  updateById(id: string, partialModel: UserPermission): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async addUserPermissions(
    profileId: string,
    permissions: { accessType: 'role'| 'permission', access: string }[]
  ): Promise<UserPermission[]> {
    const treatedPermissions = permissions.map((permission) => ({
      profile: { id: profileId },
      accessType: permission.accessType,
      access: permission.access,
    }));
    const createdPermissions = await this.ormRepository.create(
      treatedPermissions
    );
    const create = await this.ormRepository.save(createdPermissions);

    return create;
  }

  async deleteUserPermissions(
    profileId: string,
    permissions: string[]
  ): Promise<void> {
    await this.ormRepository.delete({
      profile: { id: profileId },
      access: In(permissions),
    });
  }
}
