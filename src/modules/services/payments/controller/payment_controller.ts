import { Request, Response } from "express";
import PaymentService from "../service/payment_service";

class PaymentController {
  static async processPayment(req: Request, res: Response) {
    try {
      console.log("Recebendo requisição de pagamento...", req.body);

      // Adicionando log para verificar os dados do pagamento
      const paymentData = req.body;
      console.log("Dados do pagamento enviados:", paymentData);

      const paymentService = new PaymentService();
      const result = await paymentService.processPayment(paymentData);

      // Logando o resultado para diagnóstico
      console.log("Resultado do processamento do pagamento:", result);

      if (result.success) {
        return res.status(201).json(result);
      } else {
        console.error("Erro ao processar pagamento:", result);
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Erro interno ao processar pagamento:", error);
      return res.status(500).json({ message: "Erro interno ao processar pagamento", error: error.message });
    }
  }
}

export default PaymentController;
