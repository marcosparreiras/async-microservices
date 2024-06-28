import { Order } from "../../enterprise/order";
import { ProductNotFoundException } from "../exceptions/product-not-found-exception";
import type { OrdersRepository } from "../repositories/orders-repository";
import type { ProductsRepository } from "../repositories/products-repository";

interface Input {
  productId: string;
  creditCardToken: string;
}

interface Output {
  orderId: string;
}

export class CheckoutUseCase {
  constructor(
    private orderRepository: OrdersRepository,
    private productsRepository: ProductsRepository
  ) {}

  async execute({ productId, creditCardToken }: Input): Promise<Output> {
    const product = await this.productsRepository.findById(productId);

    if (product == null) {
      throw new ProductNotFoundException();
    }
    const order = Order.create(product.id, product.price);
    await this.orderRepository.save(order);

    return { orderId: order.id };
  }
}