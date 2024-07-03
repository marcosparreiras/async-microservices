import fastify from "fastify";
import amqp from "amqplib";
import { paymentProcessedConsumer } from "./infra/consumers/payment-processed-consumer";
import { checkoutController } from "./infra/controllers/checkout-controller";
import { getOrderController } from "./infra/controllers/get-order-controller";

async function startQueueConsumers() {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: "localhost",
      port: 5672,
      username: "admin",
      password: "admin",
      vhost: "/",
    });
    const channel = await connection.createChannel();

    const queue = "payment-processed";
    channel.assertQueue(queue, { durable: false });

    channel.consume(queue, paymentProcessedConsumer, {
      noAck: true,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

const app = fastify();

app.register(checkoutController);
app.register(getOrderController);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server is running on port 3333");
});

startQueueConsumers().then(() => {
  console.log("Checkout queue consumers started");
});
