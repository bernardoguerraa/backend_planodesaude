import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ClinicController from "../controller/ClinicController";

const clinicRoutes = Router();

clinicRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      rg: Joi.string().optional(),
      cpf_cnpj: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      phoneNumber: Joi.number().optional(),
      specialty: Joi.array().required(),
      addresses: Joi.array().items(
        Joi.object({
          streetName: Joi.string().optional(),
          number: Joi.number().optional(),
          adjunct: Joi.string().optional(),
          cep: Joi.number().optional(),
          neighbourhood: Joi.string().optional(),
          city: Joi.string().optional(),
          state: Joi.string().optional(),
        })
      ),
    }),
  }),
  ClinicController.createClinic
);
clinicRoutes.post(
  "/authenticate",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  ClinicController.authenticate
);

clinicRoutes.get("/getClinics", ClinicController.getClinics);

clinicRoutes.get(
  "/getClinic/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  ClinicController.getClinicById
)

clinicRoutes.put(
  "/updateClinic",
  celebrate({
    [Segments.PARAMS]:Joi.object({
      id: Joi.string().uuid().required(),
      name: Joi.string().optional(),
      cpf: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      phoneNumber: Joi.number().optional(),
      avatar: Joi.string().optional(),
      rg: Joi.string().optional(),
      specialty: Joi.string().optional(),
    }),
  }),
  ClinicController.updateClinic
);

export default clinicRoutes;
