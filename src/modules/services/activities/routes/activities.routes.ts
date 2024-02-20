import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ActivitiesController from "../controller/ActivitiesController";

const activitiesRoutes = Router();

activitiesRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      clientId: Joi.string().uuid().required(),
      date: Joi.date().required(),
      patientCpf: Joi.number().required(),
      price: Joi.number().required(),
      profissionalName: Joi.string().required(),
      providerId: Joi.string().required(),
      specialty: Joi.string().required(),
      medical_procedure: Joi.string().required(),
    }),
  }),
  ActivitiesController.register
);

activitiesRoutes.get(
  '/findByCnpj/:cnpj',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      cnpj: Joi.number().required(),
    }),
  }),
  ActivitiesController.GetClinicByCnpj
);

export default activitiesRoutes;
