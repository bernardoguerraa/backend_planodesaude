import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import FilterController from "../controller/FilterController";

const filterRoutes = Router();

filterRoutes.post(
  "/getBySpecialty",
  celebrate({
    [Segments.BODY]: Joi.object({
      specialtyName: Joi.string().required(),
    }),
  }),
  FilterController.getBySpecialty
);

filterRoutes.post(
  "/getProfileByEmail",
  celebrate({
    [Segments.BODY]: Joi.object({
      userEmail: Joi.string().required(),
    }),
  }),
  FilterController.getProfileByEmail
);
export default filterRoutes;
