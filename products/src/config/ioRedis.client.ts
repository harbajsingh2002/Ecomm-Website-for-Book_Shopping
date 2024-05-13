import redis, { Redis } from 'ioredis';
// import dotenv, { config } from 'dotenv';
// import { createClient } from 'redis';
// dotenv.config();

// const REDIS_PORT = process.env.REDIS_PORT;
// const REDIS_HOST = process.env.REDIS_PORT;
// const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const ioRedisClient = new redis({
  //   port: REDIS_PORT,
  //   host: "REDIS_HOST",
  //   password: "REDIS_PASSWORD",
  port: 6379,
  host: 'localhost',
  password: '',
});

// ioRedisClient.connect();
ioRedisClient.on('connect', () => {
  console.log('connected to ioredis successfully!!');
});
ioRedisClient.on('error', (error: any) => {
  console.log('Redis connection error:', error);
});
export default ioRedisClient;

// const client = createClient({
//   password: 'a7DJFSiLKG4fNlx4zlA8LDd0a6n0M6yC',
//   socket: {
//     host: 'redis-16478.c325.us-east-1-4.ec2.redns.redis-cloud.com',
//     port: 16478,
//   },
// });
// import redis from 'ioredis';

// const ioRedisClient = new redis({
//   port: 5331,
//   host: 'localhost',
//   password: '',
// });

// ioRedisClient.on('connect', () => {
//   console.log('Connected to Redis server successfully!!');
// });

// ioRedisClient.on('error', (error: any) => {
//   console.log('Redis connection error:', error);
// });

// export default ioRedisClient;