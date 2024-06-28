import { OrderNotFoundException } from "../exceptions/order-not-found-exception";
import type { OrdersRepository } from "../repositories/orders-repository";

interface Input {
  orderId: string;
}

export class ApproveOrderUseCase {
  constructor(private orderRespository: OrdersRepository) {}

  async execute({ orderId }: Input): Promise<void> {
    const order = await this.orderRespository.findById(orderId);
    if (order === null) {
      throw new OrderNotFoundException();
    }

    order.approve();

    await this.orderRespository.updateApprovedAt(order);
    return;
  }
}
