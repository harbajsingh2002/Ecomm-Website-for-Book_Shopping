"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
// import dotenv, { config } from 'dotenv';
// import { createClient } from 'redis';
// dotenv.config();
// const REDIS_PORT = process.env.REDIS_PORT;
// const REDIS_HOST = process.env.REDIS_PORT;
// const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const ioRedisClient = new ioredis_1.default({
    //   port: REDIS_PORT,
    //   host: "REDIS_HOST",
    //   password: "REDIS_PASSWORD",
    port: 6379,
    host: 'localhost',
    password: '',
});
// ioRedisClient.connect();
ioRedisClient.on('connect', () => {
    console.log('Connected to ioredis successfully!!');
});
ioRedisClient.on('error', (error) => {
    console.log('Redis connection error:', error);
});
exports.default = ioRedisClient;
// const client = createClient({
//   password: 'a7DJFSiLKG4fNlx4zlA8LDd0a6n0M6yC',
//   socket: {
//     host: 'redis-16478.c325.us-east-1-4.ec2.redns.redis-cloud.com',
//     port: 16478,
//   },
// });
