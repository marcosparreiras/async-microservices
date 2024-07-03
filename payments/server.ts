import amqp from "amqplib";
import { orderCheckoutConsumer } from "./infra/consumers/order-checkout-consumer";

async function server() {
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

    const queue = "order-checkout";
    channel.assertQueue(queue, { durable: false });

    channel.consume(queue, orderCheckoutConsumer, {
      noAck: true,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

server();
