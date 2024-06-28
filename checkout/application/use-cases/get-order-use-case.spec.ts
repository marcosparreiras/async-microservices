import postgres from "postgres";
import type { OrdersRepository } from "../repositories/orders-repository";
import { clearTables } from "../../../database/clear-tables";
import { seed } from "../../../database/seed";
import { DbOrdersRepository } from "../../infra/adapters/db-orders.repository";
import { GetOrderUseCase } from "./get-order-use-case";
import { OrderNotFoundException } from "../exceptions/order-not-found-exception";

describe("GetOrderUseCase", () => {
  const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");
  let orderRepository: OrdersRepository;
  let getOrderUseCase: GetOrderUseCase;

  beforeEach(async () => {
    await clearTables(sql);
    await seed(sql);
    orderRepository = new DbOrdersRepository();
    getOrderUseCase = new GetOrderUseCase(orderRepository);
  });

  it("Should be able to get an order", async () => {
    const input = {
      orderId: "f9fa9655-d96c-47ae-9c4f-cb83bfb644b8",
    };

    const output = await getOrderUseCase.execute(input);

    expect(output).toEqual(
      expect.objectContaining({
        id: "f9fa9655-d96c-47ae-9c4f-cb83bfb644b8",
        productId: "a5f6e14e-2b12-4c2b-ae63-f85fbe05f141",
        createdAt: new Date("2024-06-28"),
        price: 130.5,
        approvedAt: null,
      })
    );
  });

  it("Should not be able to get an unexistent order", async () => {
    const input = {
      orderId: "some-fake-order_id",
    };

    await expect(getOrderUseCase.execute(input)).rejects.toBeInstanceOf(
      OrderNotFoundException
    );
  });
});
