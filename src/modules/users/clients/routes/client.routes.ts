import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ClientController from "../controller/ClientController";

const clientRoutes = Router();

clientRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      phoneNumber: Joi.number().optional(),
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
  ClientController.createClient
);

clientRoutes.post(
  "/authenticate",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  ClientController.authenticate
);

clientRoutes.get("/getClients", ClientController.getClients);

clientRoutes.get(
  "/getClient/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  ClientController.getClientsById
);

clientRoutes.put(
  "/updateClient",
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().uuid().required(),
      name: Joi.string().optional(),
      cpf: Joi.number().optional(),
      dateOfBirth: Joi.date().optional(),
      phoneNumber: Joi.number().optional(),
    }),
  }),
  ClientController.updateClient
);

clientRoutes.put(
  "/updateAddress",
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().uuid().required(),
      streetName: Joi.string().optional(),
      number: Joi.number().optional(),
      neighbourhood: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
    }),
  }),
  ClientController.updateClientAddress
);

clientRoutes.put(
  "/updateClientSecretPass",
  celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().uuid().required(),
      password: Joi.string().required(),
    }),
  }),
  ClientController.updateClientSecretPass
);
export default clientRoutes;
