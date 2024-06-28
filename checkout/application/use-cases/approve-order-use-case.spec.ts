import postgres from "postgres";
import { DbOrdersRepository } from "../../infra/adapters/db-orders.repository";
import { clearTables } from "../../../database/clear-tables";
import { seed } from "../../../database/seed";
import type { OrdersRepository } from "../repositories/orders-repository";
import { ApproveOrderUseCase } from "./approve-order-use-case";
import { OrderNotFoundException } from "../exceptions/order-not-found-exception";

describe("ConfirmOrderPaymentUseCase", () => {
  const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");
  let orderRepository: OrdersRepository;
  let sut: ApproveOrderUseCase;

  beforeEach(async () => {
    await clearTables(sql);
    await seed(sql);
    orderRepository = new DbOrdersRepository();
    sut = new ApproveOrderUseCase(orderRepository);
  });

  afterAll(async () => {
    await sql.end();
  });

  it("Should be able to approve an order", async () => {
    const input = {
      orderId: "f9fa9655-d96c-47ae-9c4f-cb83bfb644b8",
    };

    await sut.execute(input);

    const orderOnDB =
      await sql`SELECT * FROM orders WHERE id = 'f9fa9655-d96c-47ae-9c4f-cb83bfb644b8'`;

    expect(orderOnDB[0]["approved_at"]).toBeInstanceOf(Date);
  });

  it("Should not be able to confirm an unexistent order", async () => {
    const input = {
      orderId: "some-fake-order-id",
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      OrderNotFoundException
    );

    const orderOnDB =
      await sql`SELECT * FROM orders WHERE id = 'f9fa9655-d96c-47ae-9c4f-cb83bfb644b8'`;
    expect(orderOnDB[0]["approved_at"]).toBeNull();
  });
});
