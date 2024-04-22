"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controller/products.controller");
const router = express_1.default.Router();
//ROute for add new Book
router.post('/create', products_controller_1.productController.addNewBook);
exports.default = router;
