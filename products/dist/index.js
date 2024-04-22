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
dotenv_1.default.config();
console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3001;
// const MONGODB_URI =
//   process.env.MONGODB_URI ||
//   'mongodb://localhost:27017/Ecomm_Book_Shopping_Product'
app.use(express_1.default.json());
// API Routes
app.use('/api/product', products_routes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// Database connection
(0, db_config_1.default)();
