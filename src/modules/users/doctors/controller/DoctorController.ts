import { Request, Response } from "express";
import Doctor from "../../../../database/entities/Doctor";
import { doctorContainer } from "../../../../shared/aplication/tsyringe/containers/authentication";
import { CreateDoctorService } from "../service/CreateDoctorService";
import AuthenticateService from "../../authenticate/service/AuthenticateService";
import { GetDoctorsService } from "../service/GetDoctorsService";
import { GetDoctorByIdService } from "../service/GetDoctorByIdService";
import { UpdateDoctorAddressService } from "../service/UpdateDoctorAddressService";
import { UpdateDoctorSecretPassService } from "../service/UpdateDoctorSecretPassService";
import { UpdateDoctorService } from "../service/UpdateDoctorService";

export default class DoctorController {
  static async createDoctor(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      email,
      password,
      addresses,
      cpf_cnpj,
      rg,
      dateOfBirth,
      phoneNumber,
      name,
      regionalCouncilNumber,
      regionalCouncil,
      specialty,
    } = request.body;
    const doctorClientService = doctorContainer.resolve(CreateDoctorService);

    let doctor = await doctorClientService.execute({
      profile: {
        name,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        cpf_cnpj,
        rg,
      },
      addresses,
      regionalCouncil,
      regionalCouncilNumber,
      specialty,
    } as unknown as Doctor);

    if (doctor instanceof Error) {
      return response.status(400).json(doctor.message);
    }

    return response.status(201).json(doctor);
  }

  static async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateBarberService =
      doctorContainer.resolve(AuthenticateService);

    const { agent, token } = await authenticateBarberService.execute({
      email,
      password,
    });

    return response.status(200).json({ agent, token });
  }

  static async getDoctor(
    request: Request,
    response: Response
  ): Promise<Response> {
    const getDoctorService = doctorContainer.resolve(GetDoctorsService);

    const doctor = await getDoctorService.execute();

    return response.status(200).json(doctor);
  }

  static async getDoctorById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const getDoctorByIdService = doctorContainer.resolve(GetDoctorByIdService);

    const doctor = await getDoctorByIdService.execute({ id });

    return response.status(200).json(doctor);
  }

  static async UpdateDoctorAddress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, streetName, number, neighbourhood, city, state, cep } = request.body;
    const updateDoctorService = doctorContainer.resolve(
      UpdateDoctorAddressService
    );
    const doctor = await updateDoctorService.execute({
      id,
      streetName,
      number,
      neighbourhood,
      city,
      state,
      cep
    });
    return response.status(200).json(doctor);
  }

  static async updateDoctorSecretPass(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, password } = request.body;
    const updateDoctorService = doctorContainer.resolve(
      UpdateDoctorSecretPassService
    );
    const doctor = await updateDoctorService.execute({
      id,
      password,
    });
    return response.status(200).json(doctor);
  }

  static async updateDoctor(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, name, cpf, rg, avatar, dateOfBirth, phoneNumber } = request.body;
    const updateDoctorService = doctorContainer.resolve(
      UpdateDoctorService
    );
    const doctor = await updateDoctorService.execute({
      id,
      name,
      cpf,
      rg,
      avatar,
      dateOfBirth,
      phoneNumber,
    });
    return response.status(200).json(doctor);
  }
}
