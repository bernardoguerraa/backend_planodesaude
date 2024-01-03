import { inject, injectable } from "tsyringe";
import BusinessRuleViolationError from "../../../../../shared/aplication/error/BusinessRuleViolationError";
import AuthenticationError from "../../../../../shared/aplication/error/AuthenticationError";
import Service from "../../../../../database/repositories/Services";
import ClientAssociate from "../../../../../database/entities/ClientAssociate";
import ClientAssociateRepository from "../../../repository/ClientAssociateRepository";
import Client from "../../../../../database/entities/Client";
import ClientRepository from "../../../../users/repository/ClientRepository";
import UserProfile from "../../../../../database/entities/UserProfile";
import UsersProfilesRepository from "../../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../../shared/aplication/error/EntityPersistanceError";
interface DeleteAssociateServiceParams {
  associateId: string;
}

@injectable()
export default class DeleteClientAssociateService
  implements Service<DeleteAssociateServiceParams, void>
{
  private associateRepository: ClientAssociateRepository;

  constructor(
    @inject("ClientAssociateRepository")
    associateRepository: ClientAssociateRepository
  ) {
    this.associateRepository = associateRepository;
  }

  public async execute({
    associateId,
  }: DeleteAssociateServiceParams): Promise<void> {
    const clientAssociate = await this.associateRepository.findById(
      associateId
    );
    if (!clientAssociate) {
      throw new BusinessRuleViolationError("Associado não existe");
    }

    let updatedAssociate = await this.associateRepository.delete(associateId);

    return updatedAssociate;
  }
}
