import { Router } from 'express';
import { errors } from 'celebrate';
import clientRoutes from './modules/users/clients/routes/client.routes';
import doctorRoutes from './modules/users/doctors/routes/doctor.routes';
import clinicRoutes from './modules/users/clinics/routes/clinic.routes';
export default function createAplicationRouter():Router{

    const appRoutes = Router();

  appRoutes.use('/clients', clientRoutes);
  appRoutes.use('/doctors', doctorRoutes);
  appRoutes.use('/clinics', clinicRoutes);
  appRoutes.use(errors());  


    return appRoutes;
}



