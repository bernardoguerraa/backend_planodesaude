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

clientAssociateRoutes.put(
  "/updateAssociate",
  celebrate({
    [Segments.BODY]: Joi.object({
      associateId: Joi.string().uuid().required(),
      cpf: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      name: Joi.string().optional(),
      phoneNumber: Joi.number().optional(),
      rg: Joi.string().optional(),
    }),
  }),
  ClientAssociateController.updateAssociate
);
clientAssociateRoutes.delete(
  "/deleteAssociate/:associateId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      associateId: Joi.string().uuid().required(),
    }),
  }),
  ClientAssociateController.deleteAssociate
);
clientAssociateRoutes.get(
  "/getAssociates/:clientId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      clientId: Joi.string().uuid().required(),
    }),
  }),
  ClientAssociateController.getAssociates
);

export default clientAssociateRoutes;
