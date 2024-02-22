import { Request, Response } from "express";
import Clinic from "../../../../database/entities/Clinic";
import { clinicContainer } from "../../../../shared/aplication/tsyringe/containers/authentication";
import { CreateClinicService } from "../service/CreateClinicService";
import { GetClinicsService } from "../service/GetClinicsService"; 
import { GetClinicByIdService } from "../service/GetClinicByIdService";
import { UpdateClinicService } from "../service/UpdateClinicService";
import AuthenticateService from "../../authenticate/service/AuthenticateService";
import { UpdateClinicAddressService } from "../service/UpdateClinicAddressService";
import { UpdateClinicSecretPassService } from "../service/UpdateClinicSecretpassService"
import DeleteClinicService from "../service/DeleteClinicService";
export default class ClinicController {
  static async createClinic(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      email,
      password,
      addresses,
      cpf_cnpj,
      dateOfBirth,
      phoneNumber,
      name,
      rg,
      specialty,
    } = request.body;
    const createClinicService = clinicContainer.resolve(CreateClinicService);

    let clinic = await createClinicService.execute({
      profile: {
        name,
        rg,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        cpf_cnpj,
      },
      addresses,
      specialty,
    } as unknown as Clinic);

    if (clinic instanceof Error) {
      return response.status(400).json(clinic.message);
    }

    return response.status(201).json(clinic);
  }

  static async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateBarberService =
      clinicContainer.resolve(AuthenticateService);
    const { agent, token } = await authenticateBarberService.execute({
      email,
      password,
    });

    return response.status(200).json({ agent, token });
  }

  static async getClinics(
    request: Request,
    response: Response
  ): Promise<Response> {
    const getClinicsService = clinicContainer.resolve(GetClinicsService);

    const clinic = await getClinicsService.execute();

    return response.status(200).json(clinic);
  }

  static async getClinicById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const getClinicsService = clinicContainer.resolve(GetClinicByIdService);

    const clinic = await getClinicsService.execute({ id });

    return response.status(200).json(clinic);
  }

  static async updateClinic(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, name, phoneNumber, dateOfBirth, cpf, avatar, rg} =
      request.body;
    const updateClinicService = clinicContainer.resolve(UpdateClinicService);
    const clinic = await updateClinicService.execute({
      id,
      name,
      phoneNumber,
      dateOfBirth,
      cpf,
      avatar,
      rg,
    });
    return response.status(200).json(clinic);
  }

  static async updateClinicAddress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, streetName, number, neighbourhood, city, state, cep } = request.body;
    const updateClinicsService = clinicContainer.resolve(
      UpdateClinicAddressService
    );
    const clinic = await updateClinicsService.execute({
      id,
      streetName,
      number,
      neighbourhood,
      city,
      state,
      cep
    });
    return response.status(200).json(clinic);
  }

  static async updateClinicSecretPass(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, password } = request.body;
    const updateClinicService = clinicContainer.resolve(
      UpdateClinicSecretPassService
    );
    const clinic = await updateClinicService.execute({
      id,
      password,
    });
    return response.status(200).json(clinic);
  }

  static async deleteClinic(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    
    const deleteClinic = clinicContainer.resolve(DeleteClinicService);

    const updateClinic = await deleteClinic.execute({
      id
    });

    return response.status(202).json(updateClinic);
  }
}
