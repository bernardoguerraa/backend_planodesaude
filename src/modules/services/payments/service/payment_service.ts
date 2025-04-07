import { injectable } from "tsyringe";
import fetch from "node-fetch";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente

@injectable()
export default class PaymentService {
  private accessToken: string;

  constructor() {
    this.accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || "";
  }

  async processPayment(paymentData: any): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      // Gerando o ID de Idempotência
      const idempotencyKey = crypto.randomUUID();

      // Enviando a requisição para a API do Mercado Pago
      const response = await fetch("https://api.mercadopago.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          "X-Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(paymentData),
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) {
        // Captura a resposta de erro da API
        const errorResult = await response.json();
        
        // Logando o erro para debugar
        console.error("Erro na API do Mercado Pago:", errorResult);

        // Tratando erros específicos
        if (errorResult.cause) {
          // Se o erro contiver uma causa específica, podemos retornar isso também
          return { success: false, message: `Erro: ${errorResult.cause.map((err: any) => err.description).join(', ')}` };
        }
        
        // Retorna uma mensagem genérica caso o erro não tenha uma descrição clara
        return { success: false, message: errorResult.message || "Erro desconhecido ao processar pagamento." };
      }

      // Caso a requisição tenha sido bem-sucedida, processa a resposta
      const result = await response.json();
      return { success: true, data: result };

    } catch (error) {
      // Captura erros internos (como falha de rede, ou erro de JSON)
      console.error("Erro ao processar pagamento:", error);

      // Retorna mensagem de erro genérica
      return { success: false, message: "Erro interno ao processar pagamento" };
    }
  }
}

