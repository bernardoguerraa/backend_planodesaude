import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateActivitiesForAssociatesService from "../service/CreateActivitiesForAssociatesService";
export default class ActivitiesController {
  static async register(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId, patientCpf, profissionalName, price, date, specialty } =
      request.body;

    const result = container.resolve(CreateActivitiesForAssociatesService);

    const activity = result.execute({
      date,
      patientCpf,
      price,
      profissionalName,
      providerId,
      specialty,
    });

    return response.status(201).json(activity);
  }
}
