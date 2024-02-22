import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ClinicAssociateController from "../controller/AssociateController";

const clinicAssociateRoutes = Router();

clinicAssociateRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      clinicId: Joi.string().uuid().required(),
      name: Joi.string().required(),
      cpf: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      regionalCouncilNumber: Joi.number().required(),
      regionalCouncil: Joi.string().required(),
      specialty: Joi.array().required(),
    }),
  }),
  ClinicAssociateController.createAssociate
);

export default clinicAssociateRoutes;
