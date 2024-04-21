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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
//import { valStore, loginStore } from "../validation/store.validation";
const response_1 = require("../utilis/messages/response");
const store_services_1 = require("../services/store.services");
// const createNewStore = async (req: Request, res: Response): Promise<IStore> => {
//   try {
//     const { storeName, email, description, contact, address } = req.body;
//     const newStore = new Store({
//       storeName,
//       email,
//       description,
//       contact,
//       address,
//     });
//     // Save the new store to the database
//     const store = await newStore.save();
//     // Respond with the newly created store data
//     res.status(201).json(store);
//     return store; // Return the newly created store
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating store:", error);
//     throw error; // Throw the error for further handling
//   }
// };
//export default { createNewStore };
// export class StoreServices {
//   public static async createNewStore(req: Request, res: Response){
//       try {
//           // const { error } = storeValidation.valStore(req.body);
//           // if (error) {
//           //     return res.status(400).json({
//           //         error: error.details.map((err) => err.MESSAGE.replace(/"/g, ''))
//           //     });
//           // }
//           res.status(200).json({ SUCCESS: true, message: 'Store created successfully.' });
//       } catch (error) {
//           // Handle errors appropriately, for example:
//           console.error('Error creating store:', error);
//           res.status(500).json({ error: 'Internal server error' });
//       }
//   }
// }
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
                if (data) {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.add("Store")));
                }
                else {
                    res.status(response_1.STATUS_CODE.NOT_CREATED);
                }
            }
            catch (err) {
                // logger.error(message.errorLog('productAdd', 'productController', err))
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.message, response_1.MESSAGE.SOMETHING_WENT_WRONG));
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
                const isStore = yield store_services_1.StoreServices.login(email, password);
                if (isStore) {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, isStore, response_1.MESSAGE.LOGIN));
                }
                else if (isStore === "invalidStore") {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.failAction)(response_1.STATUS_CODE.SUCCESS, isStore, response_1.MESSAGE.Invalidlogin));
                }
                else
                    isStore === "notExist";
                {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.failAction)(response_1.STATUS_CODE.SUCCESS, response_1.MESSAGE.notExist("Store")));
                }
            }
            catch (err) {
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.message, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
    //Get store
    static getStoreById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = req.params.id;
                //console.log(storeId)
                // const data = await StoreServices.getStoreById(req.params.storeId);
                const data = yield store_services_1.StoreServices.getStoreById(req.params);
                if (data) {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.fetch("Store")));
                }
            }
            catch (err) {
                // logger.error(MESSAGE.errorLog('userList', 'userController', err))
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.message, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
    //Get All Store
    static getAllStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield store_services_1.StoreServices.getAllStore(req.query);
                res
                    .status(response_1.STATUS_CODE.SUCCESS)
                    .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.fetch("User")));
            }
            catch (err) {
                //logger.error(MESSAGE.errorLog('userList', 'userController', err))
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
    //Update store
    static updateStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield store_services_1.StoreServices.updateStore(req.params, req.body);
                if (data) {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.update("Store")));
                }
            }
            catch (err) {
                //logger.error(MESSAGE.errorLog('userUpdate', 'userController', err))
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
    //Delete Store
    static deleteStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield store_services_1.StoreServices.deleteStore(req.body, req.params);
                res
                    .status(response_1.STATUS_CODE.SUCCESS)
                    .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, response_1.MESSAGE.delete("Store")));
            }
            catch (err) {
                //logger.error(MESSAGE.errorLog('userDelete', 'userController', err))
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
}
exports.StoreController = StoreController;
