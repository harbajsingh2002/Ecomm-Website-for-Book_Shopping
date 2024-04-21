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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store_model_2 = __importDefault(require("../model/store.model"));
class StoreServices {
    static deleteStore(body, params) {
        throw new Error("Method not implemented.");
    }
    static createNewStore(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeName, email, password, contact, address, description } = body;
                // Input validation
                if (!storeName || !email || !password) {
                    throw new Error("Store name, email, and password are required");
                }
                const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
                const newStore = yield store_model_1.default.create({
                    storeName: body.storeName,
                    email: body.email,
                    password: hashedPassword,
                    contact: body.contact,
                    address: body.address,
                    description: body.description,
                });
                return newStore.save();
                // return newStore
            }
            catch (error) {
                throw new Error();
            }
        });
    }
    //Login Store
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new Error("Store name, email, and password are required");
                }
                // Find the store based on the provided email
                const store = yield store_model_1.default.findOne({ email });
                if (!store) {
                    throw new Error("Store not found");
                }
                if (store) {
                    // Compare the provided password with the hashed password stored in the database
                    const isPasswordValid = yield bcrypt_1.default.compare(password, store.password);
                    if (!isPasswordValid) {
                        throw new Error("Incorrect password");
                    }
                    else {
                        // if password is valid den generate JWT token
                        const token = jsonwebtoken_1.default.sign({ storeId: store._id, email }, process.env.Token_Key, { expiresIn: "30min" });
                        return store;
                    }
                }
                else if (store) {
                    return "invalidStore";
                }
                else {
                    return "notExist";
                }
            }
            catch (error) {
                // Handle errors
                throw new Error("Login failed");
            }
        });
    }
    // Get Store by id
    static getStoreById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = data.id;
                console.log(storeId);
                const findStore = yield store_model_2.default.findOne({ where: { id: storeId } });
                if (!findStore) {
                    throw new Error("Store not found");
                }
                return findStore;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Get All store
    static getAllStore(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeListing = yield store_model_2.default.find({
                    where: { isDeleted: false },
                    attributes: ['id', 'name', 'age', 'email'],
                    order: [['createdAt', 'asc']],
                    offset: query.page ? (parseInt(query.page) - 1) * parseInt(query.limit) : 0,
                    limit: query.limit ? parseInt(query.limit) : 10,
                });
                return storeListing;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Update Store
    static updateStore(body, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield store_model_2.default.findOne({ where: { _id: params.id } });
                if (!store) {
                    return "notExist";
                }
                else {
                    return yield store.updateOne(body);
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    //Soft Delete Store
    deleteStore(body, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield store_model_2.default.findOne({ where: { id: params.id } });
                if (!store) {
                    return "notExist";
                }
                else {
                    const date = new Date();
                    const existingStore = yield store.updateOne({
                        isDeleted: true,
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
}
exports.StoreServices = StoreServices;
