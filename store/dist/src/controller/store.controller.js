"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.StoreController = void 0;
//import { valStore, loginStore } from "../validation/store.validation";
const response_1 = require("../utilis/messages/response");
const store_services_1 = require("../services/store.services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const ioredis_1 = require("ioredis");
class StoreController {
    static createNewStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { error } = valStore.validate(req.body);
                // if (error) {
                //   return res.status(400).json({
                //     error: error.details.map((err: { message: string }) =>
                //       err.message.replace(/"/g, "")
                //     ),
                //   });
                // }
                const data = yield store_services_1.StoreServices.createNewStore(req.body);
                if (!data) {
                    res.status(response_1.STATUS_CODE.NOT_CREATED);
                }
                res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.add('Store')));
            }
            catch (err) {
                // logger.error(message.errorLog('productAdd', 'productController', err))
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // const { error } = loginStore.validate(req.body);
                // if (error) {
                //   return res.status(400).json({
                //     error: error.details.map((err: { message: string }) =>
                //       err.message.replace(/"/g, "")
                //     ),
                //   });
                // }
                // const isStore = await StoreServices.login(email, password);
                if (!email || !password) {
                    throw new Error(email ? 'email' : 'password' + 'are required');
                }
                // Find the store based on the provided email
                const store = yield store_services_1.StoreServices.getByAttribute({ email });
                if (!store) {
                    throw new Error('Store not found');
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, store.password);
                if (!isPasswordValid) {
                    throw new Error('Incorrect password');
                }
                const token = jwt.sign({ storeId: store._id, email }, process.env.Token_Key, { expiresIn: '30min' });
                res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, { _id: store._id, email: store.email, token: token }, response_1.MESSAGE.LOGIN));
                // if (isStore) {
                //   res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, isStore, MESSAGE.LOGIN));
                // } else if (isStore === 'invalidStore') {
                //   res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, isStore, MESSAGE.Invalidlogin));
                // } else isStore === 'notExist';
                // {
                //   res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Store')));
                // }
            }
            catch (err) {
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.INTERNET_SERVER_ERROR));
            }
        });
    }
    //Get store by Id
    static getStoreById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = req.params.id;
                const findStore = yield store_services_1.StoreServices.getStoreById(storeId);
                if (!findStore) {
                    res.status(response_1.STATUS_CODE.NOT_CREATED).json((0, response_1.failAction)(response_1.STATUS_CODE.SUCCESS, response_1.MESSAGE.notExist('Store not existed')));
                }
                res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, findStore, response_1.MESSAGE.fetch('Store')));
            }
            catch (err) {
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.INTERNET_SERVER_ERROR));
            }
        });
    }
    //Get All Store
    static getAllStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('gyfduhdjigf');
                const storeData = yield store_services_1.StoreServices.getAllStore();
                res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, storeData, response_1.MESSAGE.fetch('Store')));
            }
            catch (err) {
                //logger.error(MESSAGE.errorLog('storeList', 'storeController', err))
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.INTERNET_SERVER_ERROR));
            }
        });
    }
    //Update store
    static updateStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = req.params.id;
                //const { name, address, email, password, contact } = req.body;
                const findStore = yield store_services_1.StoreServices.getStoreById(storeId);
                if (!findStore) {
                    res.status(404).json((0, response_1.failAction)(response_1.STATUS_CODE.SUCCESS, response_1.MESSAGE.notExist('Store not existed')));
                }
                const data = yield store_services_1.StoreServices.updateStore(storeId, req.body);
                //const data = await StoreServices.updateStore({id:req.params});
                if (data) {
                    res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.update('Store')));
                }
            }
            catch (err) {
                console.log('err', err.MESSAGE);
                //logger.error(MESSAGE.errorLog('storeUpdate', 'storeController', err))
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.INTERNET_SERVER_ERROR));
            }
        });
    }
    //Delete Store
    static deleteStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield store_services_1.StoreServices.deleteStore(req);
                res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, response_1.MESSAGE.delete('Store')));
            }
            catch (err) {
                //logger.error(MESSAGE.errorLog('userDelete', 'userController', err))
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.INTERNET_SERVER_ERROR));
            }
        });
    }
    //Publisher mesage
    static publishMessage(req, res, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                console.log('requestBody', requestBody);
                const message = {
                    message: requestBody,
                    channelName: 'storeChannel',
                    // date: new Intl.DateTimeFormat('es-ES').format(new Date()),
                };
                let channelName = 'storeChannel';
                const publisher = new ioredis_1.Redis();
                yield publisher.subscribe('productChannel', (message) => {
                    console.log(message); // 'message'
                });
                //console.log(`Publishing an Event using Redis to: ${JSON.stringify(requestBody)}`);
                res.status(response_1.STATUS_CODE.SUCCESS).json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, message, 'Publishing a message using Redis successfull'));
                return message;
            }
            catch (err) {
                //logger.error(MESSAGE.errorLog('userDelete', 'userController', err))
                res.status(response_1.STATUS_CODE.BAD_REQUEST).json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.INTERNET_SERVER_ERROR));
            }
        });
    }
}
exports.StoreController = StoreController;
// public static async publishMessage(req: Request, res: Response,body :IStore) {
//   try {
//     const data = await StoreServices.createNewStore(req.body);
//     if (data== "Product already Exist"){
//       res.status((STATUS_CODE.SUCCESS).json(successResponse(STATUS_CODE.SUCCESS,data,MESSAGE))
//     }else {
//       res.status(STATUS_CODE.SUCCESS).json(successResponse(STATUS_CODE.SUCCESS, data, MESSAGE.add('product')));
//     }
//   } catch (err:any) {
//     res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, MESSAGE.SOMETHING_WENT_WRONG));
//   }
// }
