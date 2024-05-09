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
exports.StoreServices = void 0;
const store_model_1 = __importDefault(require("../model/store.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import * as jwt from 'jsonwebtoken';
const store_model_2 = __importDefault(require("../model/store.model"));
const ioredis_1 = require("ioredis");
const subscriber = new ioredis_1.Redis();
const publisher = new ioredis_1.Redis();
class StoreServices {
    static createNewStore(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeName, email, password } = body;
                // Input validation
                if (!storeName || !email || !password) {
                    throw new Error('Store name, email, and password are required');
                }
                const checkStore = yield store_model_2.default.findOne({
                    $and: [{ email: body.email }, { isDeleted: false }],
                });
                if (checkStore) {
                    //return error
                    throw new Error('Email already existed');
                }
                const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
                const newStore = yield store_model_2.default.create({
                    storeName: body.storeName,
                    email: body.email,
                    password: hashedPassword,
                    contact: body.contact,
                    address: body.address,
                    description: body.description,
                });
                return newStore.save();
            }
            catch (error) {
                throw new Error();
            }
        });
    }
    // //Login Store
    // public static async login(email: string, password: string) {
    //   try {
    //     if (!email || !password) {
    //       throw new Error('Store name, email, and password are required');
    //     }
    //     // Find the store based on the provided email
    //     const store = await this.getByAttribute({ email });
    //     if (!store) {
    //       throw new Error('Store not found');
    //     }
    //     if (store) {
    //       const isPasswordValid = await bcrypt.compare(password, store.password);
    //       if (!isPasswordValid) {
    //         throw new Error('Incorrect password');
    //       } else {
    //         // if password is valid den generate JWT token
    //         const token = jwt.sign({ storeId: store._id, email }, process.env.Token_Key!, { expiresIn: '30min' });
    //         return { _id: store._id, email: store.email, token: token };
    //       }
    //     } else if (store) {
    //       return 'invalidStore';
    //     } else {
    //       return 'notExist';
    //     }
    //   } catch (error) {
    //     // Handle errors
    //     throw new Error('Login failed');
    //   }
    // }
    // Get Store by Id
    static getStoreById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findStore = yield this.getByAttribute({ _id });
                if (!findStore) {
                    throw new Error('Store not found');
                }
                return findStore;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    // listing of store
    // public static async getAllStore() {
    //   try {
    // const storeListing = await Store.find();
    // console.log(storeListing);
    // return storeListing;
    //   } catch (err: any) {
    //     throw new Error(err.message);
    //   }
    // }
    static getAllStore() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10) {
            try {
                const skip = (pageNumber - 1) * pageSize;
                const posts = yield store_model_2.default.aggregate([{ $sample: { size: 40 } }, { $skip: skip }, { $limit: pageSize }]);
                return posts;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Update Store
    static updateStore(_id, reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedStore = yield store_model_2.default.findByIdAndUpdate(_id, Object.assign({}, reqData), { new: true, useFindAndModify: true });
                return updatedStore;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Soft Delete Store
    static deleteStore(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = reqData.params.id;
                const store = yield store_model_2.default.findById(storeId);
                //console.log(storeId)
                // const store = await Store.findOne({ where: { id: storeId.id } });
                if (!store) {
                    return 'notExist';
                }
                else {
                    const date = new Date();
                    const existingStore = yield store_model_2.default.findByIdAndUpdate(storeId, {
                        isDeleted: true,
                        isActive: false,
                        deletedAt: date,
                    });
                    return existingStore;
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static getByAttribute(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findStore = yield store_model_2.default.findOne(attributes).lean();
                return findStore;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Publish Message
    // public static async publishMessage(req: Request, res: Response, message: string, publisher: string) {
    //   try {
    //     console.log('Inside service');
    //     const requestBody = req.body;
    //     // const message = {
    //     //   message: requestBody,
    //     //   date: new Intl.DateTimeFormat('es-ES').format(new Date()),
    //     // };
    //     const result = redisClient.publish('channelName', JSON.stringify(message));
    //     console.log(`Publishing an Event using Redis to: ${JSON.stringify(requestBody)}`);
    //     return result;
    //   } catch (err: any) {
    //     console.error(err);
    //     throw new Error(err.message);
    //   }
    // }
    static publishMessage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the store already exists
                const store = yield store_model_1.default.findById(body.id);
                if (store) {
                    return 'storeAlreadyExist';
                }
                else {
                    // Subscribe to product channel to receive responses
                    subscriber.subscribe('productChannel');
                    // Publish store ID
                    // eslint-disable-next-line no-inner-declarations
                    function publishStoreId(data) {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield publisher.publish('storeChannel', JSON.stringify(data));
                            console.log(data, 'Store ID published');
                        });
                    }
                    // Publish productId and wait for response
                    yield publishStoreId(body.productId);
                    // Wait for response about product
                    const response = yield new Promise((resolve) => {
                        subscriber.once('message', (channel, message) => {
                            if (channel === 'productChannel') {
                                const productData = JSON.parse(message);
                                console.log(productData, 'Received product data');
                                if (productData.id === body.productId) {
                                    console.log('Product found');
                                    resolve('yes');
                                }
                                else {
                                    console.log('Product not found');
                                    resolve('no');
                                }
                            }
                        });
                    });
                    if (response === 'yes') {
                        console.log(body, 'Creating store');
                        yield store_model_1.default.create(body);
                        return 'storeCreated';
                    }
                    else {
                        console.log('Product not found.');
                        return 'productNotFound';
                    }
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
exports.StoreServices = StoreServices;
//Need to add this in the produst or store module
