import type { Order } from "../../enterprise/order";

export interface OrdersRepository {
  save(order: Order): Promise<void>;
}
