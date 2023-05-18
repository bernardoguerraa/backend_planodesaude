import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ClinicController from "../controller/ClinicController";

const clinicRoutes = Router();


clinicRoutes.post("/register",
celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        cpf: Joi.number().optional(),
        dateOfBirth: Joi.date().optional(),
        phoneNumber: Joi.number().optional(),
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
    })
}),ClinicController.createClinic
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


export default clinicRoutes;