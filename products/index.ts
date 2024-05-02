import express, { Request, Response } from 'express';
import dotenv, { config } from 'dotenv';
import connectDB from './src/config/db.config';
import productRouter from './src/routes/products.routes';
import helmet from 'helmet';
import cors from 'cors';
import ioRedisClient from './src/config/ioRedis.client';
import redisClient from './src/config/redis.client';
import Redis from 'ioredis';
import { BooksServices } from './src/services/products.services';
import { subscribeAll } from './src/redis';

const subsciber = new Redis();
// import NRP from 'node-redis-pubsub';

//configuring the .env
dotenv.config();

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

//Setting Up Express App
const app = express();

//Setting Up Middleware: Using helmet() to enhance the app's security by setting various HTTP headers and cors() to enable Cross-Origin Resource Sharing.
app.use(helmet());
app.use(cors());

// Setting Port
const port = process.env.PORT || 3003;

//Parsing Request Body:
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const nrp = new NRP.NodeRedisPubSub({
//   PORT: 6379,
//   scope: 'microservice',
// });

// API Routes: define routes for handling product-
app.use('/api/products', productRouter);

//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server'); //message
});

//Starting the Server:The Express server to listen on the specified port.
app.listen(port, () => {
  console.log(`[server]: Product is running at: ${port}`);
});

// Database connection
connectDB();

//Subscriber
// subsciber.subscribe('storeChannel');
// subsciber.on('message', (channel, Message) => {
//   console.log(`received the store data from${channel}:`, JSON.parse(Message));
// });
subscribeAll();

//Redis connection
redisClient;
ioRedisClient;
