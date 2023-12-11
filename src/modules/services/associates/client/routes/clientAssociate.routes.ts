import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ClientAssociateController from "../controller/ClientAssociateController";

const clientAssociateRoutes = Router();

clientAssociateRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      clientId: Joi.string().uuid().required(),
      cpf: Joi.number().required(),
      dateOfBirth: Joi.date().optional(),
      name: Joi.string().required(),
      phoneNumber: Joi.number().optional(),
      rg: Joi.string().optional(),
    }),
  }),
  ClientAssociateController.createAssociate
);

export default clientAssociateRoutes;
