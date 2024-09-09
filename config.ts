import dotenv from 'dotenv';

dotenv.config();

const port: number = Number(process.env.PORT);

export { port };
