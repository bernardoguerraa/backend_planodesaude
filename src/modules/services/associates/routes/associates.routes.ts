import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import AssociateController from "../controller/AssociateController";

const associateRoutes = Router();

associateRoutes.post(
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
  AssociateController.createAssociate
);

export default associateRoutes;
