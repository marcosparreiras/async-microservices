import z from "zod";
import type { FastifyInstance } from "fastify";
import { GetOrderUseCase } from "../../application/use-cases/get-order-use-case";
import { DbOrdersRepository } from "../adapters/db-orders.repository";

export async function getOrderController(app: FastifyInstance) {
  app.get("/orders/:id", async (request, reply) => {
    const requestParamsSchema = z.object({
      id: z.string(),
    });

    try {
      const { id } = requestParamsSchema.parse(request.params);
      const orderRepository = new DbOrdersRepository();
      const getOrderUseCase = new GetOrderUseCase(orderRepository);
      const order = await getOrderUseCase.execute({ orderId: id });
      return reply.status(200).send({ order });
    } catch (error: unknown) {
      console.log(error);
      return reply.status(500).send({ status: "error" });
    }
  });
}
