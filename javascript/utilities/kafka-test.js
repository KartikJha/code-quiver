// import { KafkaClient, Consumer } from "kafka-node";
const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
  kafkaHost: process.argv[2] || "load-broker.hotstar.npe:9092 ",
});

client.createTopics([{
  topic: 'topic1forTest',
  partitions: 1,
  replicationFactor: 2
}], (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const consumer = new kafka.Consumer(
    client,
    [
      { topic: "topic1forTest", partition: 0, offset: 0 },
    ],
    {
      autoCommit: false
    }
  );
  
  consumer.on('message', function (message) {
      console.log(message);
  });

  const producer = new kafka.Producer(client);

  producer.on('ready', () => {
    let i = 0;
    setInterval(() => {
      payloads = [{ topic: 'topic1forTest', messages: 'hi' + (++i), partition: 0 }];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
    }, 5000)
  })
});