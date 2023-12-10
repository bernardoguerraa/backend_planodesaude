import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import DoctorController from "../controller/DoctorController";

const doctorRoutes = Router();

doctorRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      rg: Joi.string().required(),
      cpf_cnpj: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      phoneNumber: Joi.number().optional(),
      regionalCouncilNumber: Joi.number().required(),
      regionalCouncil: Joi.string().required(),
      specialty: Joi.array().required(),
      addresses: Joi.array().items(
        Joi.object({
          streetName: Joi.string().optional(),
          number: Joi.number().optional(),
          adjunct: Joi.string().optional(),
          neighbourhood: Joi.string().optional(),
          city: Joi.string().optional(),
          state: Joi.string().optional(),
        })
      ),
    }),
  }),
  DoctorController.createDoctor
);

doctorRoutes.post(
  "/authenticate",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  DoctorController.authenticate
);

export default doctorRoutes;
