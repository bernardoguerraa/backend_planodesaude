import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetClinicAndDoctorBySpecialtyService } from "../service/GetClinicAndDoctorBySpecialty";
export default class FilterController {
  static async getBySpecialty(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { specialtyName } = request.body;

    const providerSpecialtyService = container.resolve(
      GetClinicAndDoctorBySpecialtyService
    );

    const providers = await providerSpecialtyService.execute({ specialtyName });

    return response.status(200).json(providers);
  }
}
