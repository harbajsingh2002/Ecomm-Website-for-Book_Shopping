"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksServices = void 0;
const products_model_1 = __importDefault(require("../model/products.model"));
class BooksServices {
    static addNewBook(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author, description, category, price, image } = body;
                // Input validation
                if (!title) {
                    throw new Error('title is required');
                }
                const newBook = yield products_model_1.default.create({
                    title: body.title,
                    author: body.author,
                    description: body.description,
                    category: body.category,
                    price: body.price,
                    image: body.image,
                });
                return newBook.save();
                // return newStore
            }
            catch (error) {
                throw new Error();
            }
        });
    }
}
exports.BooksServices = BooksServices;
