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
          cep: Joi.number().optional(),
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

doctorRoutes.get("/getDoctor", DoctorController.getDoctor);

doctorRoutes.get(
  "/getDoctor/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  DoctorController.getDoctorById
);

doctorRoutes.put(
  "/updateDoctorAddress",
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().uuid().required(),
      streetName: Joi.string().optional(),
      cep: Joi.number().optional(),
      number: Joi.number().optional(),
      neighbourhood: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
    }),
  }),
  DoctorController.UpdateDoctorAddress
);

doctorRoutes.put(
  "/updateDoctorSecretPass",
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().uuid().required(),
      password: Joi.string().required(),
    }),
  }),
  DoctorController.updateDoctorSecretPass
)

doctorRoutes.put(
  "/updateDoctor",
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().uuid().required(),
      name: Joi.string().optional(),
      cpf: Joi.number().optional(),
      phoneNumber: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      rg: Joi.string().optional(),
      avatar: Joi.string().optional(),
      specialty: Joi.string().optional(),
    }),
  }),
  DoctorController.updateDoctor
)

doctorRoutes.delete(
  "/deleteDoctor/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required()
    }),
  }),
  DoctorController.deleteDoctor
)

export default doctorRoutes;
