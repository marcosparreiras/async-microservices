import { z } from "zod";
import { ProcessPaymentUseCase } from "../../application/use-cases/process-payment-use-case";
import type { ConsumeMessage } from "amqplib";
import { BrokerQueue } from "../../../checkout/infra/adapters/broker-queue";

export async function orderCheckoutConsumer(message: ConsumeMessage | null) {
  const messageDataSchema = z.object({
    creditCardToken: z.string(),
    orderId: z.string(),
    price: z.coerce.number(),
  });
  try {
    if (message === null) {
      throw new Error("Message is null");
    }
    const { creditCardToken, price, orderId } = messageDataSchema.parse(
      JSON.parse(message.content.toString())
    );
    const queue = new BrokerQueue();
    const processPaymentUseCase = new ProcessPaymentUseCase(queue);
    await processPaymentUseCase.execute({ price, creditCardToken, orderId });
  } catch (error: unknown) {
    console.log(error);
  }
}
