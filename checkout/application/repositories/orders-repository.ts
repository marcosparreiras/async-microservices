import type { Order } from "../../enterprise/order";

export interface OrdersRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  updateApprovedAt(order: Order): Promise<void>;
}
