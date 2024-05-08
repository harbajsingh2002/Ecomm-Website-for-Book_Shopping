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
const ioredis_1 = __importDefault(require("ioredis"));
const products_model_1 = __importDefault(require("../model/products.model"));
const redisSubscriber = new ioredis_1.default();
class BooksServices {
    static addNewBook(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = body;
                // Input validation
                if (!title) {
                    throw new Error('Title is required');
                }
                const newBook = yield products_model_1.default.create({
                    title: body.title,
                    author: body.author,
                    description: body.description,
                    category: body.category,
                    price: body.price,
                    //image: body.image,
                });
                return newBook.save();
                // return newStore
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //get by attribute
    static getByAttribute(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findBook = yield products_model_1.default.findOne(attributes).lean();
                return findBook;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Find the book by id
    static getBookById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findBook = yield this.getByAttribute({ _id });
                if (!findBook) {
                    throw new Error('Book not found');
                }
                return findBook;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Get All Books
    // public static async getAllbooks() {
    //   try {
    //     const bookListing = await Books.find();
    //     console.log(bookListing);
    //     return bookListing;
    //   } catch (err: any) {
    //     throw new Error(err.message);
    //   }
    // }
    static getAllbooks() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10) {
            try {
                const skip = (pageNumber - 1) * pageSize;
                const posts = yield products_model_1.default.aggregate([{ $sample: { size: 40 } }, { $skip: skip }, { $limit: pageSize }]);
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Update book
    static updateBook(_id, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBook = yield products_model_1.default.findByIdAndUpdate(_id, Object.assign({}, reqData), { new: true, useFindAndModify: true });
                return updatedBook;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Soft Delete Book
    static deleteBook(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = reqData.params.id;
                const book = yield products_model_1.default.findById(bookId);
                //console.log(bookId)
                if (!book) {
                    return 'Book not existed';
                }
                else {
                    const date = new Date();
                    const existingBook = yield products_model_1.default.findByIdAndUpdate(bookId, {
                        $set: {
                            isDeleted: true,
                            isActive: false,
                            deletedAt: date, // Assuming you want to set the deletion timestamp
                        },
                    });
                    return existingBook;
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Upload imgae of book
    static uploadImage(body, imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log('hjh');
                const { title, author, description, category, price, image } = body;
                // const image = body.image
                //console.log(image);
                const newBook = yield products_model_1.default.create({
                    title,
                    author,
                    description,
                    category,
                    price,
                    image: imagePath,
                });
                return newBook.save();
                // } catch (err: any) {
                //   throw new Error(err.message)
                // }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    console.error('File or directory not found:', err.path);
                }
                else {
                    console.error('An error occurred:', err);
                }
            }
        });
    }
    //Subscribe to publishe messages
    static subscribeToMessages(channelName, message, subscriber) {
        return __awaiter(this, void 0, void 0, function* () {
            const publisher = new ioredis_1.default();
            if (channelName == 'storeChannel') {
                const publisher = ioredis_1.default.createClient();
                yield publisher.connect();
                // const storeData = JSON.parse(message);
                const rsp = yield publisher.publish('productChannel', message);
                // return storeData;
            }
            redisSubscriber.subscribe(channelName, (err, channelName) => {
                if (err) {
                    console.error('Error subscribing to channel:', err);
                }
                else {
                    console.log(`Subscribed to ${channelName} channel(s).`);
                }
            });
            try {
                const parsedMessage = JSON.parse(message);
                console.log('Processing the message...');
                console.log('Parsed message:', parsedMessage);
                if (parsedMessage.type === 'request') {
                    console.log('Responding to the request...');
                }
                return parsedMessage;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
exports.BooksServices = BooksServices;
