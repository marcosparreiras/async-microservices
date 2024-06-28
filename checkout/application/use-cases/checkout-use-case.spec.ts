import postgres from "postgres";
import { DbOrdersRepository } from "../../infra/adapters/db-orders.repository";
import { DbProductsRepository } from "../../infra/adapters/db-products-repository";
import { CheckoutUseCase } from "./checkout-use-case";
import type { OrdersRepository } from "../repositories/orders-repository";
import type { ProductsRepository } from "../repositories/products-repository";
import { ProductNotFoundException } from "../exceptions/product-not-found-exception";
import { clearTables } from "../../../database/clear-tables";
import { seed } from "../../../database/seed";

describe("CheckoutUseCase", () => {
  const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");
  let ordersRepository: OrdersRepository;
  let productsRepository: ProductsRepository;
  let sut: CheckoutUseCase;

  beforeEach(async () => {
    await clearTables(sql);
    await seed(sql);
    ordersRepository = new DbOrdersRepository();
    productsRepository = new DbProductsRepository();
    sut = new CheckoutUseCase(ordersRepository, productsRepository);
  });

  afterAll(async () => {
    sql.end();
  });

  it("Should do a checkout", async () => {
    const input = {
      productId: "a5f6e14e-2b12-4c2b-ae63-f85fbe05f141",
      creditCardToken: "some-token",
    };

    const output = await sut.execute(input);

    expect(output.orderId).toBeDefined();
    expect(output).toBeDefined();

    const orderOnDb =
      await sql`SELECT * FROM orders WHERE id = ${output.orderId}`;

    expect(orderOnDb[0]["product_id"]).toEqual(input.productId);
  });

  it("Should not be able to do a checkout of an unexistent product", async () => {
    const input = {
      productId: "unexistent-product-id",
      creditCardToken: "some-token",
    };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      ProductNotFoundException
    );
  });
});
