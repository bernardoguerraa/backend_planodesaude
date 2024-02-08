import { Request, Response } from "express";
import ClientAssociate from "../../../../../database/entities/ClientAssociate";
import { container } from "tsyringe";
import CreateClientAssociateService from "../service/CreateClientAssociateService";
import UpdateClientAssociateService from "../service/UpdateClientAssociateService";
import DeleteClientAssociateService from "../service/DeleteClientAssociateService";
import GetClientAssociateService from "../service/GetClientAssociateService";
export default class ClientAssociateController {
  static async getAssociates(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { clientId } = request.params;

    const getAssociate = container.resolve(GetClientAssociateService);

    const associate = await getAssociate.execute({
      clientId,
    });

    return response.status(201).json(associate);
  }

  static async createAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      clientId,
      name,
      dateOfBirth,
      phoneNumber,
      cpf,
      rg,
      email,
      password,
    } = request.body;

    const createAssociate = container.resolve(CreateClientAssociateService);

    const associate = await createAssociate.execute({
      clientId,
      cpf,
      dateOfBirth,
      name,
      phoneNumber,
      rg,
      email,
      password,
    });

    return response.status(201).json(associate);
  }
  static async updateAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { associateId, name, dateOfBirth, phoneNumber, cpf, rg } =
      request.body;

    const updateAssociate = container.resolve(UpdateClientAssociateService);

    const associate = await updateAssociate.execute({
      associateId,
      cpf,
      dateOfBirth,
      name,
      phoneNumber,
      rg,
    });

    return response.status(201).json(associate);
  }
  static async deleteAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { associateId } = request.params;

    const deleteAssociate = container.resolve(DeleteClientAssociateService);

    const associate = await deleteAssociate.execute({
      associateId,
    });

    return response.status(202).json(associate);
  }
}
