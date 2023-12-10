import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import SpecialtyController from "../controller/SpecialtyController";

const specialtyRoutes = Router();

specialtyRoutes.post("/register", SpecialtyController.createSpecialty);
export default specialtyRoutes;
