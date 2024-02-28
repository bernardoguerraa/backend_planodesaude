import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ActivitiesController from "../controller/ActivitiesController";

const activitiesRoutes = Router();

activitiesRoutes.post(
  "/registerDoctorAssociate",
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.date().required(),
      patientCpf: Joi.number().required(),
      price: Joi.number().required(),
      profissionalName: Joi.string().required(),
      providerId: Joi.string().required(),
      specialty: Joi.string().required(),
      medical_procedure: Joi.string().required(),
    }),
  }),
  ActivitiesController.registerActiviteDoctorAssociate
);

activitiesRoutes.post(
  "/registerDoctorClient",
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.date().required(),
      patientCpf: Joi.number().required(),
      price: Joi.number().required(),
      profissionalName: Joi.string().required(),
      providerId: Joi.string().required(),
      specialty: Joi.string().required(),
      medical_procedure: Joi.string().required(),
    }),
  }),
  ActivitiesController.registerActiviteDoctorClient
);

activitiesRoutes.post(
  "/registerClinicAssociate",
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.date().required(),
      patientCpf: Joi.number().required(),
      price: Joi.number().required(),
      profissionalName: Joi.string().required(),
      providerId: Joi.string().required(),
      specialty: Joi.string().required(),
      medical_procedure: Joi.string().required(),
    }),
  }),
  ActivitiesController.registerActiviteClinicAssociate
);

activitiesRoutes.post(
  "/registerClinicClient",
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.date().required(),
      patientCpf: Joi.number().required(),
      price: Joi.number().required(),
      profissionalName: Joi.string().required(),
      providerId: Joi.string().required(),
      specialty: Joi.string().required(),
      medical_procedure: Joi.string().required(),
    }),
  }),
  ActivitiesController.registerActiviteClinicClient
);

activitiesRoutes.get(
  "/getByCpf",
  celebrate({
    [Segments.BODY]: Joi.object({
      cpf: Joi.number().required(),
    }),
  }),
  ActivitiesController.getByCpf
);

activitiesRoutes.get(
  "/getByClintId/:clientId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      clientId: Joi.string().required(),
    }),
  }),
  ActivitiesController.getByClientId
);
activitiesRoutes.get(
  "/getByProviderId/:providerId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      providerId: Joi.string().required(),
    }),
  }),
  ActivitiesController.getByProviderID
);

activitiesRoutes.get(
  "/getByClinicCnpj",
  celebrate({
    [Segments.BODY]: Joi.object({
      cnpj: Joi.number().required(),
    }),
  }),
  ActivitiesController.getByCnpj
);

activitiesRoutes.get(
  "/getByDoctorCpf",
  celebrate({
    [Segments.BODY]: Joi.object({
      cpf: Joi.number().required(),
    }),
  }),
  ActivitiesController.getByDoctorCpf
);

export default activitiesRoutes;
