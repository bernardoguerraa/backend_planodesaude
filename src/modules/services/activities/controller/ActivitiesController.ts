import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateActivitiesForAssociatesService from "../service/CreateActivitiesForAssociatesService";
import { GetClinicActivityService } from "../service/GetClinicActivityService";
export default class ActivitiesController {
  static async register(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { providerId, patientCpf, profissionalName, price, date, specialty, medical_procedure } =
      request.body;

    const result = container.resolve(CreateActivitiesForAssociatesService);

    const activity = result.execute({
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

  static async GetClinicByCnpj(
    request: Request,
    response: Response
  ): Promise<Response>{
    
    const { cnpj } = request.params;

    const result = container.resolve(GetClinicActivityService);

    const numericCnpj = Number(cnpj);

    if(isNaN(numericCnpj)) {
      console.log('Erro ao converter o cnpj para tipo number');
      return response.status(400).json({error: 'Cnpj invalido'});
    }

    const clinic = await result.execute({
      cnpj: numericCnpj,
    });

    return response.status(201).json(clinic);
  }
}
