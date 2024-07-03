import type { ConsumeMessage } from "amqplib";
import z from "zod";
import { ApproveOrderUseCase } from "../../application/use-cases/approve-order-use-case";
import { DbOrdersRepository } from "../adapters/db-orders.repository";

export async function paymentProcessedConsumer(message: ConsumeMessage | null) {
  const messageDataSchema = z.object({
    orderId: z.string(),
  });
  try {
    if (message === null) {
      throw new Error("Message is null");
    }
    const { orderId } = messageDataSchema.parse(
      JSON.parse(message.content.toString())
    );

    const orderRepository = new DbOrdersRepository();
    const approveOrderUseCase = new ApproveOrderUseCase(orderRepository);

    await approveOrderUseCase.execute({ orderId });
  } catch (error: unknown) {
    console.log(error);
  }
}
