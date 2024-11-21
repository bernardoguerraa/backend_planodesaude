import "reflect-metadata";
import "express-async-errors";
import initialize from "./shared/aplication/tsyringe";
import express from "express";
import cors from "cors";
import createAplicationRouter from "./routes";
import paymentsRoutes from './modules/services/payments/routes/payment_route';
import 'dotenv/config';
import "./database";

const app = express();
initialize();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(createAplicationRouter());

// Rotas de pagamento
app.use('/api/payments', paymentsRoutes);

// Define a porta do servidor
const PORT = process.env.PORT || 4020;

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});