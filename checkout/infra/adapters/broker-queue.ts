import type { Queue } from "../../application/queue/queue";
import amqp from "amqplib";

export class BrokerQueue implements Queue {
  private connection: amqp.Connection | null = null;

  private async connect() {
    this.connection = await amqp.connect({
      protocol: "amqp",
      hostname: "localhost",
      port: 5672,
      username: "admin",
      password: "admin",
      vhost: "/",
    });
  }

  public async publish(queue: string, message: any): Promise<void> {
    await this.connect();
    if (this.connection === null) return;
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
}
