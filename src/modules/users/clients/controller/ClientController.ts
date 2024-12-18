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
import DeleteClientService from "../service/DeleteClientService";
export default class ClientController {
  static async createClient(
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
    } = request.body;
    const createClientService = clientContainer.resolve(CreateClientService);

    let client = await createClientService.execute({
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
    const { id, name, phoneNumber, dateOfBirth, cpf, avatar, rg } =
      request.body;
    const updateClientsService = clientContainer.resolve(UpdateClientsService);
    const client = await updateClientsService.execute({
      id,
      name,
      phoneNumber,
      dateOfBirth,
      cpf,
      avatar,
      rg,
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
    const { id, streetName, number, neighbourhood, city, state, cep } =
      request.body;
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
      cep,
    });
    return response.status(200).json(client);
  }

  static async deleteClient(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const deleteclient = clientContainer.resolve(DeleteClientService);

    const client = await deleteclient.execute({
      id,
    });
    
    return response.status(202).json(client);
  }
}
