import { Repository, getRepository } from "typeorm";
import Filters from "../../../../database/repositories/Filter";
import Model from "../../../../database/repositories/Model";
import ActivitiesRepository from "../ActivitiesRepository";
import Activity from "../../../../database/entities/Activity";
import P from "pino";

export default class ActivitiesRepositoryTORM implements ActivitiesRepository {
  private ormRepository: Repository<Activity>;

  constructor() {
    this.ormRepository = getRepository(Activity);
  }

  async find(filters: Filters<Activity>): Promise<Activity[]> {
    const repositories = await this.ormRepository.find({
      where: filters,
    });

    return repositories;
  }
  async findByClientId(clientId: string): Promise<Activity[]> {
    const result = await this.ormRepository.find({
      where: { client: clientId },
    });

    return result;
  }
  async findByAssociateCpf(associateCpf: number): Promise<Activity[]> {
    const result = await this.ormRepository.find({
      where: { patientCpf: associateCpf },
    });

    return result;
  }
  async findByProviderId(providerId: string): Promise<Activity[]> {
    const result = await this.ormRepository.find({
      where: { provider: providerId },
    });

    return result;
  }
  async create(model: Model<Activity>): Promise<Activity> {
    let activity = this.ormRepository.create(model);
    activity = await this.ormRepository.save(activity);

    return activity;
  }

  async updateById(id: string, partialModel: Activity): Promise<void> {
    await this.ormRepository.update(id, partialModel);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
