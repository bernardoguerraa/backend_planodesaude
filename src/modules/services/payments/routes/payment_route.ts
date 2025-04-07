import { Router } from "express";
import PaymentController from "../controller/payment_controller";

const router = Router();

router.post("/payments", PaymentController.processPayment);

export default router;