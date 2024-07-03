import z from "zod";
import type { FastifyInstance } from "fastify";
import { DbOrdersRepository } from "../adapters/db-orders.repository";
import { DbProductsRepository } from "../adapters/db-products-repository";
import { BrokerQueue } from "../adapters/broker-queue";
import { CheckoutUseCase } from "../../application/use-cases/checkout-use-case";

export async function checkoutController(app: FastifyInstance) {
  app.post("/orders", async (request, reply) => {
    const requestParamsSchema = z.object({
      productId: z.string(),
      creditCardToken: z.string(),
    });

    try {
      const { productId, creditCardToken } = requestParamsSchema.parse(
        request.body
      );

      const productRepository = new DbProductsRepository();
      const orderRepository = new DbOrdersRepository();
      const queue = new BrokerQueue();
      const checkoutUseCase = new CheckoutUseCase(
        orderRepository,
        productRepository,
        queue
      );
      const { orderId } = await checkoutUseCase.execute({
        creditCardToken,
        productId,
      });
      return reply.status(201).send({ orderId });
    } catch (error: unknown) {
      console.log(error);
      return reply.status(500).send({ status: "error" });
    }
  });
}
