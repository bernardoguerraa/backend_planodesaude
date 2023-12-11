import { Request, Response } from "express";
import ClientAssociate from "../../../../../database/entities/ClientAssociate";
import { container } from "tsyringe";
import CreateClientAssociateService from "../service/CreateClientAssociateService";
export default class ClientAssociateController {
  static async createAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { clientId, name, dateOfBirth, phoneNumber, cpf, rg } = request.body;

    const createAssociate = container.resolve(CreateClientAssociateService);

    const associate = await createAssociate.execute({
      clientId,
      cpf,
      dateOfBirth,
      name,
      phoneNumber,
      rg,
    });

    return response.status(201).json(associate);
  }
}
