import postgres from "postgres";
import type { OrdersRepository } from "../../application/repositories/orders-repository";
import { Order } from "../../enterprise/order";

export class DbOrdersRepository implements OrdersRepository {
  private sql = postgres("postgresql://admin:admin@localhost:5432/my_db");

  async save(order: Order): Promise<void> {
    await this
      .sql`INSERT INTO orders(id, product_id, created_at, approved_at, price)
    VALUES(${order.id}, ${order.productId}, ${order.createdAt}, ${order.approvedAt}, ${order.price})`;
  }

  async findById(id: string): Promise<Order | null> {
    const result = await this.sql`SELECT * FROM orders WHERE id = ${id}`;
    if (result.length === 0) {
      return null;
    }
    const orderData = result[0];
    return new Order(
      orderData["id"],
      orderData["product_id"],
      orderData["created_at"],
      orderData["price"],
      orderData["approved_at"]
    );
  }

  async updateApprovedAt(order: Order): Promise<void> {
    await this
      .sql`UPDATE orders SET approved_at = ${order.approvedAt} WHERE id = ${order.id}`;
  }
}
