import postgres from "postgres";
import type { OrdersRepository } from "../../application/repositories/orders-repository";
import type { Order } from "../../enterprise/order";

export class DbOrdersRepository implements OrdersRepository {
  private sql = postgres("postgresql://admin:admin@localhost:5432/my_db");

  async save(order: Order): Promise<void> {
    await this
      .sql`INSERT INTO orders(id, product_id, created_at, approved_at, price)
    VALUES(${order.id}, ${order.productId}, ${order.createdAt}, ${order.approvedAt}, ${order.price})`;
  }
}
