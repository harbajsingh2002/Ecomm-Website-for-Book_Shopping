"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./src/config/db.config"));
const store_routes_1 = __importDefault(require("./src/routes/store.routes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const ioRedis_client_1 = __importDefault(require("./src/config/ioRedis.client"));
const redis_client_1 = __importDefault(require("./src/config/redis.client"));
// import NRP from 'node-redis-pubsub';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3002;
app.use(express_1.default.json());
//
// const nrp = new NRP.NodeRedisPubSub({
//   PORT: 6379,
//   scope: 'microservice',
// });
// API Routes
app.use('/api/store', store_routes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Store is running at port: ${port}`);
});
// Database connection
(0, db_config_1.default)();
//Publisher
function publisherMessage(channel, message) {
    // Publish the message to the specified channel
    redis_client_1.default.publish(channel, JSON.stringify(message));
    console.log('Message published to channel:', channel);
}
// Call the publisherMessage function with the desired channel and message
publisherMessage('storeChannel', { key: 'value' });
//Redis connection
redis_client_1.default;
ioRedis_client_1.default;
