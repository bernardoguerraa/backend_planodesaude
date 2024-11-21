import { Router } from 'express';
import { pagamentoController } from '../controller/payment_controller';

const router = Router();

router.post('/pagamentos', pagamentoController.processar);

export default router;