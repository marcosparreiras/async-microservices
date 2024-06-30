import amqp from "amqplib";

async function send() {
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

    const queue = "my-queue";
    const msg = "my first message";

    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log("Send message: " + msg);

    setTimeout(function () {
      connection.close();
    }, 500);
  } catch (error: unknown) {
    console.log(error);
  }
}

send();
