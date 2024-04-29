import redis, { createClient } from 'redis';
// import dotenv, { config } from 'dotenv';
// dotenv.config();

// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const REDIS_HOST = process.env.REDIS_PORT || 'localhost';
// const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

const redisClient = createClient({
  password: '',
  socket: {
    // host: REDIS_HOST,
    // port: REDIS_PORT,
    host: 'localhost',
    port: 6379,
  },
});

redisClient.connect();
redisClient.on('connect', () => {
  console.log('Connected to redis successfully!!');
});
redisClient.on('error', (error: any) => {
  console.log('Redis connection error:', error);
});

// await client.connect();
// await client.set('foo', 'bar');
// const value = await client.get('foo');
// console.log(value)
export default redisClient;
