import dotenv from 'dotenv';

dotenv.config();

const port: number = Number(process.env.PORT);

const kafkaConnect: string = String(process.env.KAFKA_CONNECTION);

export { port, kafkaConnect };
