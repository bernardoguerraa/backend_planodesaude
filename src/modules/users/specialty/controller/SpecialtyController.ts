import { Request, Response } from "express";
import { container } from "tsyringe";
import Specialty from "../../../../database/entities/Specialty";
import { CreateSpecialtyService } from "../service/CreateSpecialtyService";
export default class SpecialtyController {
  static async createSpecialty(
    request: Request,
    response: Response
  ): Promise<Response> {
    const specialtyService = container.resolve(CreateSpecialtyService);

    const result = await specialtyService.execute();

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  }
}
