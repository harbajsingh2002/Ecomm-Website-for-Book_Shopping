import express, { Request, Response } from 'express';
import dotenv, { config } from 'dotenv';
import connectDB from './src/config/db.config';
import userRouter from './src/routes/user.routes';
import helmet from 'helmet';
import cors from 'cors';
import redisClient from './src/config/redis.client';
import ioRedisClient from './src/config/ioRedis.client';

//configuring dotenv to load environment variables from a .env
dotenv.config();

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

//Setting Up Express App
const app = express();

//Setting Up Middleware: Using helmet() to enhance the app's security by setting various HTTP headers and cors() to enable Cross-Origin Resource Sharing.
app.use(helmet());
app.use(cors());

// Setting Port
const port = process.env.PORT || 3001;

//Parsing Request Body:
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// API Routes: define routes for handling product-
app.use('/api/users', userRouter);

//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server'); //message
});

//Starting the Server:The Express server to listen on the specified port.
app.listen(port, () => {
  console.log(`[server]: Users is running at port: ${port}`);
});

// Database connection
connectDB();

//Redis connection
redisClient;
ioRedisClient;
