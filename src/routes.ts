import { Router, Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import clientRoutes from "./modules/users/clients/routes/client.routes";
import doctorRoutes from "./modules/users/doctors/routes/doctor.routes";
import clinicRoutes from "./modules/users/clinics/routes/clinic.routes";
import handleError from "./shared/middlewares/handleException";
import AppGeneralError from "./shared/aplication/error/AppError";
export default function createAplicationRouter(): Router {
  const appRoutes = Router();

  appRoutes.use("/clients", clientRoutes);
  appRoutes.use("/doctors", doctorRoutes);
  appRoutes.use("/clinics", clinicRoutes);
  appRoutes.use(errors());
  appRoutes.use(handleError);
  return appRoutes;
}
