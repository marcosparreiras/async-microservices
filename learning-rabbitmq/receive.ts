import amqp from "amqplib";

async function receive() {
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

    channel.assertQueue(queue, { durable: false });

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg?.content.toString());
      },
      {
        noAck: true,
      }
    );

    setTimeout(function () {
      connection.close();
    }, 500);
  } catch (error: unknown) {
    console.log(error);
  }
}

receive();
