import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetClinicAndDoctorBySpecialtyService } from "../service/GetClinicAndDoctorBySpecialty";
import { GetProfileByEmailService } from "../service/GetProfileByEmail";
import { GetClinicAndDoctorByNameService } from "../service/GetClinicAndDoctorByNameService";
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

  static async getProfileByEmail(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userEmail } = request.body;

    const providerSpecialtyService = container.resolve(
      GetProfileByEmailService
    );

    const provider = await providerSpecialtyService.execute({ userEmail });

    return response.status(200).json(provider);
  }

  static async getClinicAndDoctorByName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name } = request.body;

    const getProfileByName = container.resolve(
      GetClinicAndDoctorByNameService
    );

    const profile = await getProfileByName.execute(name);

    return response.status(200).json(profile);
  }
}
