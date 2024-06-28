//const Kafka = require("kafkajs").Kafka
const { Kafka, Partitioners } = require("kafkajs");
const msg = process.argv[2];
run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    console.log("Connecting.....");
    await producer.connect();
    console.log("Connected!");
    const partition = 0;
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit(0);
  }
}
