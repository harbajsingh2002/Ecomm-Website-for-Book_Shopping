"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./src/config/db.config"));
const products_routes_1 = __importDefault(require("./src/routes/products.routes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// import ioRedisClient from './src/config/ioRedis.client';
const redis_client_1 = __importDefault(require("./src/config/redis.client"));
const ioredis_1 = __importDefault(require("ioredis"));
const redis_1 = require("./src/redis");
const subsciber = new ioredis_1.default();
//configuring the .env
dotenv_1.default.config();
//console.log(process.env.PORT);
//console.log(process.env.MONGODB_URI);
//Setting Up Express App
const app = (0, express_1.default)();
//Setting Up Middleware:
//Using helmet() to enhance the app's security by setting various HTTP headers
app.use((0, helmet_1.default)());
//Cors() to enable Cross-Origin Resource Sharing
app.use((0, cors_1.default)());
// Setting Port
const port = process.env.PORT || 3003;
//Parsing Request Body:
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API Routes: define routes for handling product-
app.use('/api/products', products_routes_1.default);
//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server'); //message
});
//Starting the Server:The Express server to listen on the specified port.
app.listen(port, () => {
    console.log(`[server]: Product is running at: ${port}`);
});
// Database connection
(0, db_config_1.default)();
//Subscriber
// subsciber.subscribe('storeChannel');
// subsciber.on('message', (channel, Message) => {
//   console.log(`received the store data from${channel}:`, JSON.parse(Message));
// });
(0, redis_1.subscribeAll)();
//Redis connection
redis_client_1.default;
// ioRedisClient;
