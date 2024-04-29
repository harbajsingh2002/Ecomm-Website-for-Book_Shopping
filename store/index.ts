import express, { Request, Response } from 'express';
import dotenv, { config } from 'dotenv';
import connectDB from './src/config/db.config';
import storeRouter from './src/routes/store.routes';
import helmet from 'helmet';
import ioRedisClient from './src/config/ioRedis.client';
import redisClient from './src/config/redis.client';

dotenv.config();
const app = express();
app.use(helmet());

const port = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use('/api/store', storeRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
// Database connection
connectDB();

//Timestamp
// import  moment  from 'moment'
// console.log(moment());
//console.log(process.env.PORT);
//console.log(process.env.MONGODB_URI);

//Redis connection
redisClient;
ioRedisClient;
