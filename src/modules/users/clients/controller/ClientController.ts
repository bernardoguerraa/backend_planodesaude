import { Request, Response } from "express";
import Client from "../../../../database/entities/Client";
import { clientContainer } from "../../../../shared/aplication/tsyringe/containers/authentication";
import { CreateClientService } from "../service/CreateClientService";
import { GetClientByIdService } from "../service/GetClientByIdService";
import { GetClientsService } from "../service/GetClientsService";
import { UpdateClientsService } from "../service/UpdadeClientService";
import { UpdateClientAddressService } from "../service/UpdateClientAddressService";
import { UpdateClientSecretPassService } from "../service/UpdateClientSecretpass";
import AuthenticateService from "../../authenticate/service/AuthenticateService";
export default class ClientController {
  static async createClient(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      email,
      password,
      addresses,
      cpf,
      rg,
      dateOfBirth,
      phoneNumber,
      name,
    } = request.body;
    const createClientService = clientContainer.resolve(CreateClientService);

    let client = await createClientService.execute({
      profile: {
        name,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        cpf,
      },
      addresses,
    } as unknown as Client);

    if (client instanceof Error) {
      return response.status(400).json(client.message);
    }

    return response.status(201).json(client);
  }

  static async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateBarberService =
      clientContainer.resolve(AuthenticateService);

    const result = await authenticateBarberService.execute({
      email,
      password,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  }

  static async getClientsById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const getClientsService = clientContainer.resolve(GetClientByIdService);

    const client = await getClientsService.execute({ id });

    return response.status(200).json(client);
  }

  static async getClients(
    request: Request,
    response: Response
  ): Promise<Response> {
    const getClientsService = clientContainer.resolve(GetClientsService);

    const clients = await getClientsService.execute();

    return response.status(200).json(clients);
  }

  static async updateClient(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, name, phoneNumber, dateOfBirth, cpf } = request.body;
    const updateClientsService = clientContainer.resolve(UpdateClientsService);
    const client = await updateClientsService.execute({
      id,
      name,
      phoneNumber,
      dateOfBirth,
      cpf,
    });
    return response.status(200).json(client);
  }

  static async updateClientSecretPass(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, password } = request.body;
    const updateClientsService = clientContainer.resolve(
      UpdateClientSecretPassService
    );
    const client = await updateClientsService.execute({
      id,
      password,
    });
    return response.status(200).json(client);
  }

  static async updateClientAddress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, streetName, number, neighbourhood, city, state } = request.body;
    const updateClientsService = clientContainer.resolve(
      UpdateClientAddressService
    );
    const client = await updateClientsService.execute({
      id,
      streetName,
      number,
      neighbourhood,
      city,
      state,
    });
    return response.status(200).json(client);
  }
}
