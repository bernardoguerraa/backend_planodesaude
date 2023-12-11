import { Request, Response } from "express";
import Associate from "../../../../../database/entities/ClinicAssociate";
import { container } from "tsyringe";
import CreateAssociateService from "../service/CreateAssociateService";

export default class ClinicAssociateController {
  static async createAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      clinicId,
      dateOfBirth,
      name,
      regionalCouncil,
      regionalCouncilNumber,
      specialty,
    } = request.body;

    const createAssociate = container.resolve(CreateAssociateService);

    const associate = await createAssociate.execute({
      clinicId,
      dateOfBirth,
      name,
      regionalCouncil,
      regionalCouncilNumber,
      specialty,
    });

    return response.status(201).json(associate);
  }
}
