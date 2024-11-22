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
        address,
        first_name,       // Adicionado
        last_name,        // Adicionado
      } = req.body;

      // Validação dos campos obrigatórios
      if (!transaction_amount || !payment_method_id || !email) {
        return res.status(400).json({
          message: "Campos obrigatórios ausentes. Verifique e tente novamente.",
        });
      }

      // Configuração básica do pagamento
      const paymentData: any = {
        transaction_amount,
        description: description || "Pagamento para plano de saúde",
        payment_method_id,
        payer: {
          email,
          first_name,         // Adicionado
          last_name,          // Adicionado
          identification: {
            type: identificationType,
            number: identificationNumber,
          },
        },
      };

      // Dados específicos para cartão de crédito
      if (payment_method_id === "credit_card") {
        paymentData.token = token;
        paymentData.installments = installments;
        paymentData.issuer_id = issuer_id;
      }

      // Dados específicos para boleto
      if (payment_method_id === "bolbradesco") {
        if (!address || !address.zip_code) {
          return res.status(400).json({
            message: "Campos obrigatórios para pagamento com boleto ausentes. Verifique e tente novamente.",
          });
        }

        paymentData.payer.address = {
          zip_code: address.zip_code,
          street_name: address.street_name,
          street_number: address.street_number,
          neighborhood: address.neighborhood,
          city: address.city,
          federal_unit: address.federal_unit,
        };
      }

      // Chamando o serviço para processar o pagamento
      const paymentResult = await paymentService.processPayment(paymentData);

      // Tratando resposta do serviço
      if (paymentResult.success) {
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

