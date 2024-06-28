import { OrderNotFoundException } from "../exceptions/order-not-found-exception";
import type { OrdersRepository } from "../repositories/orders-repository";

interface Input {
  orderId: string;
}

interface Output {
  id: string;
  productId: string;
  createdAt: Date;
  price: number;
  approvedAt: Date | null;
}

export class GetOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({ orderId }: Input): Promise<Output> {
    const order = await this.orderRepository.findById(orderId);
    if (order === null) {
      throw new OrderNotFoundException();
    }
    return {
      id: order.id,
      productId: order.productId,
      createdAt: order.createdAt,
      price: order.price,
      approvedAt: order.approvedAt,
    };
  }
}
