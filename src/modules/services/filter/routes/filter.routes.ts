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
export default filterRoutes;
