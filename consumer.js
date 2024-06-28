//const Kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs");
const { createServer } = require("http");
const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Check the request method and URL
  if (req.method === "GET" && req.url === "/healthcheck") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Server Started Running At ${sdate.toString()}!`,
      })
    );
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
run();
async function run() {
  server.listen(3000, async () => {
    try {
      const kafka = new Kafka({
        clientId: "myapp",
        // if you want to use kafka outside docker use localhost:9092
        brokers: ["kafka1:29092"],
      });

      const consumer = kafka.consumer({ groupId: "test" });
      console.log("Connecting.....");
      await consumer.connect();
      console.log("Connected!");

      await consumer.subscribe({
        topic: "Users",
        fromBeginning: true,
      });

      await consumer.run({
        eachMessage: async (result) => {
          console.log(
            `RVD Msg ${result.message.value} on partition ${result.partition}`
          );
        },
      });
    } catch (ex) {
      console.error(`Something bad happened ${ex}`);
    } finally {
    }
    console.log("SERVER", "Server listening at port 3001");
  });
}
