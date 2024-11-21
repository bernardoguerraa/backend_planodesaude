const fetch = require('node-fetch');
const crypto = require('crypto');
require('dotenv').config();

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

async function processPayment(paymentData) {
    try {
        // Gerando uma chave idempotente única
        const idempotencyKey = crypto.randomUUID();

        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-Idempotency-Key': idempotencyKey,
            },
            body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, message: result.message };
        }
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        throw new Error('Erro ao processar pagamento');
    }
}

module.exports = { processPayment };

