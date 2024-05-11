import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config';
import storeRouter from './src/routes/store.routes';
import helmet from 'helmet';
import cors from 'cors';
// import ioRedisClient from './src/config/ioRedis.client';
import redisClient from './src/config/redis.client';
// import Redis from 'ioredis';

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());

const port = process.env.PORT || 3002;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/store', storeRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Store is running at port: ${port}`);
});

// Database connection
connectDB();

//Publisher
function publisherMessage(channel: string, message: any) {
  redisClient.publish(channel, JSON.stringify(message));
  console.log('Message published to channel:', channel);
}

// Call the publisherMessage function with the desired channel and message
publisherMessage('storeChannel', { key: 'value' });

//Redis connection
redisClient;
// ioRedisClient;
