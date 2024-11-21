import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Pagamento } from "../../../../database/entities/Payments"; 
const paymentService = require("../service/payment_service");

export const pagamentoController = {
  async processar(req: Request, res: Response): Promise<Response> {
    try {
      const {
        transaction_amount,
        token,
        description,
        installments,
        payment_method_id,
        issuer_id,
        email,
        identificationType,
        identificationNumber,
      } = req.body;

      // Validação dos campos obrigatórios
      if (!transaction_amount || !payment_method_id || !email) {
        return res.status(400).json({
          message: "Campos obrigatórios ausentes. Verifique e tente novamente.",
        });
      }

      // Se o pagamento for cartão, apenas com os campos necessários
      const paymentData: any = {
        transaction_amount,
        description: description || "Pagamento para plano de saúde", // default para a descrição
        payment_method_id,
        payer: {
          email,
          identification: {
            type: identificationType,
            number: identificationNumber,
          },
        },
      };

      // Se o método de pagamento for cartão, incluir os dados específicos do cartão
      if (payment_method_id === 'credit_card') {
        paymentData.token = token;
        paymentData.installments = installments;
        paymentData.issuer_id = issuer_id;
      }

      // Chamando o serviço para processar o pagamento
      const paymentResult = await paymentService.processPayment(paymentData);

      // Tratando resposta do serviço
      if (paymentResult.success) {
        // Salvando o pagamento no banco de dados
        const paymentRepository = getRepository(Pagamento);
        
        const newPayment = paymentRepository.create({
          transaction_amount,
          description: paymentData.description,
          payment_method: payment_method_id,
          status: paymentResult.data.status,
          payer_email: email,
        });

        await paymentRepository.save(newPayment);

        return res.status(200).json({
          message: "Pagamento processado com sucesso!",
          data: paymentResult.data,
        });
      } else {
        return res.status(400).json({
          message: "Erro ao processar pagamento.",
          error: paymentResult.message,
        });
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error.message || error);
      return res.status(500).json({
        message: "Erro interno no servidor.",
        error: error.message || error,
      });
    }
  },
};
