import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateActivitesForAssociatesByDoctorServices from "../service/CreateActivitesForAssociatesByDoctorServices";
import CreateActivitesForClientByDoctor from "../service/CreateActivitesForClientByDoctor";
import CreateActivitiesForAssociatesByClinicService from "../service/CreateActivitiesForAssociatesByClinicService";
import CreateActivitiesForClientByClinic from "../service/CreateActivitiesForClientByClinic";
import GetActivitesByAssociateCpfService from "../service/GetActivitesByAssociateCpfService";
import GetActivitesByClientIdService from "../service/GetActivitesByClientIdService";
import GetActivitiesByProviderIdService from "../service/GetActivitiesByProviderIdService";
import GetActivitiesByClinicCnpjService from "../service/GetActivitiesByClinicCnpjService";
import GetActivitiesByDoctorCpfService from "../service/GetActivitiesByDoctorCpfService";
export default class ActivitiesController {
  static async registerActiviteDoctorAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId, patientCpf, profissionalName, price, date, specialty } =
      request.body;

    const result = container.resolve(
      CreateActivitesForAssociatesByDoctorServices
    );
    const activity = await result.execute({
      date,
      patientCpf,
      price,
      profissionalName,
      providerId,
      specialty,
    });

    return response.status(201).json(activity);
  }
  static async registerActiviteDoctorClient(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId, patientCpf, profissionalName, price, date, specialty, medical_procedure } =
      request.body;

    const result = container.resolve(CreateActivitesForClientByDoctor);

    const activity = await result.execute({
      date,
      patientCpf,
      price,
      profissionalName,
      providerId,
      specialty,
      medical_procedure,
    });

    return response.status(201).json(activity);
  }
  static async registerActiviteClinicAssociate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId, patientCpf, profissionalName, price, date, specialty, medical_procedure} =
      request.body;

    const result = container.resolve(
      CreateActivitiesForAssociatesByClinicService
    );

    const activity = await result.execute({
      date,
      patientCpf,
      price,
      profissionalName,
      providerId,
      specialty,
      medical_procedure,
    });

    return response.status(201).json(activity);
  }
  static async registerActiviteClinicClient(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId, patientCpf, profissionalName, price, date, specialty, medical_procedure } =
      request.body;

    const result = container.resolve(CreateActivitiesForClientByClinic);

    const activity = await result.execute({
      date,
      patientCpf,
      price,
      profissionalName,
      providerId,
      specialty,
      medical_procedure,
    });

    return response.status(201).json(activity);
  }

  static async getByCpf(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { cpf } = request.body;

    const result = container.resolve(GetActivitesByAssociateCpfService);

    const activity = await result.execute({
      cpf,
    });

    return response.status(201).json(activity);
  }

  static async getByCnpj(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { cnpj } = request.body;

    const result = container.resolve(GetActivitiesByClinicCnpjService);

    const activity = await result.execute({
      cnpj,
    });
    return response.status(201).json(activity);
  }

  static async getByClientId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { clientId } = request.params;

    const result = container.resolve(GetActivitesByClientIdService);

    const activity = await result.execute({
      clientId,
    });

    return response.status(201).json(activity);
  }

  static async getByProviderID(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId } = request.params;

    const result = container.resolve(GetActivitiesByProviderIdService);

    const activity = await result.execute({
      providerId,
    });

    return response.status(201).json(activity);
  }

  static async getByDoctorCpf(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { cpf } = request.body;

    const result = container.resolve(GetActivitiesByDoctorCpfService);

    const activity = await result.execute({
      cpf,
    });
    return response.status(201).json(activity);
  }
}
