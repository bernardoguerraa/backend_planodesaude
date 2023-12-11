import { Router, Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import clientRoutes from "./modules/users/clients/routes/client.routes";
import doctorRoutes from "./modules/users/doctors/routes/doctor.routes";
import clinicRoutes from "./modules/users/clinics/routes/clinic.routes";
import clinicAssociateRoutes from "./modules/services/associates/clinic/routes/clinicAassociates.routes";
import clientAssociateRoutes from "./modules/services/associates/client/routes/clientAssociate.routes";
import handleError from "./shared/middlewares/handleException";
import filterRoutes from "./modules/services/filter/routes/filter.routes";
import specialtyRoutes from "./modules/users/specialty/routes/specialty.routes";
import AppGeneralError from "./shared/aplication/error/AppError";
export default function createAplicationRouter(): Router {
  const appRoutes = Router();

  appRoutes.use("/clients", clientRoutes);
  appRoutes.use("/doctors", doctorRoutes);
  appRoutes.use("/clinics", clinicRoutes);
  appRoutes.use("/clinicAssociates", clinicAssociateRoutes);
  appRoutes.use("/clientAssociates", clientAssociateRoutes);
  appRoutes.use("/filter", filterRoutes);
  appRoutes.use("/specialty", specialtyRoutes);
  appRoutes.use(errors());
  appRoutes.use(handleError);
  return appRoutes;
}
