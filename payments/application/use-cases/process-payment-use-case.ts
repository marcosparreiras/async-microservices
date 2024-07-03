import type { Queue } from "../../../checkout/application/queue/queue";

interface Input {
  price: number;
  creditCardToken: string;
  orderId: string;
}

export class ProcessPaymentUseCase {
  constructor(private queue: Queue) {}

  async execute({ price, creditCardToken, orderId }: Input): Promise<void> {
    console.log(
      `Payment approved (${creditCardToken} - ${price} R$ - order: ${orderId})`
    );
    await this.queue.publish("payment-processed", {
      orderId,
    });
  }
}
