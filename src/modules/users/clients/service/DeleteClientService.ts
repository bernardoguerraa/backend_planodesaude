import Client from "../../../../database/entities/Client";
import { inject, injectable } from "tsyringe";
import Service from "../../../../database/repositories/Services";
import ClientRepository from "../../repository/ClientRepository";
import BusinessRuleViolationError from "../../../../shared/aplication/error/BusinessRuleViolationError";

interface DeleteClientParams {
    id: string;
}

@injectable()
export default class DeleteClientService
    implements Service<DeleteClientParams, void>
{
    private clientRepository: ClientRepository; //interacao com o repositorio

    constructor(
        @inject("ClientRepository")
        clientRepositoy: ClientRepository
    ) {
        this.clientRepository = clientRepositoy;
    }

    public async execute({
        id,
    }: DeleteClientParams): Promise<void> {
        const client = await this.clientRepository.findById(
            id
        );
        if (!client) {
            throw new BusinessRuleViolationError("Cliente nao encontrado");
        }

        let updateClient = await this.clientRepository.delete(id);

        return updateClient;
    }
}