import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import FilterController from "../controller/FilterController";

const filterRoutes = Router();

filterRoutes.get(
  "/getBySpecialty",
  celebrate({
    [Segments.BODY]: Joi.object({
      specialtyName: Joi.string().required(),
    }),
  }),
  FilterController.getBySpecialty
);

filterRoutes.get(
  "/getProfileByEmail",
  celebrate({
    [Segments.BODY]: Joi.object({
      userEmail: Joi.string().required(),
    }),
  }),
  FilterController.getProfileByEmail
);

filterRoutes.post(
  "/getProfileByName",
  celebrate({
    [Segments.BODY]: Joi.object({
      clinicDoctorName: Joi.string().required(),
    }),
  }),
  FilterController.getClinicAndDoctorByName
);
export default filterRoutes;
