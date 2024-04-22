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
exports.productController = void 0;
const response_1 = require("../utilis/messages/response");
const products_services_1 = require("../services/products.services");
class productController {
    static addNewBook(arg0, addNewBook) {
        throw new Error('Method not implemented.');
    }
    static createNewProduct(req, res) {
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
                const data = yield products_services_1.BooksServices.addNewBook(req.body);
                if (data) {
                    res
                        .status(response_1.STATUS_CODE.SUCCESS)
                        .json((0, response_1.successAction)(response_1.STATUS_CODE.SUCCESS, data, response_1.MESSAGE.add('Store')));
                }
                else {
                    res.status(response_1.STATUS_CODE.NOT_CREATED);
                }
            }
            catch (err) {
                // logger.error(message.errorLog('productAdd', 'productController', err))
                res
                    .status(response_1.STATUS_CODE.BAD_REQUEST)
                    .json((0, response_1.failAction)(response_1.STATUS_CODE.BAD_REQUEST, err.MESSAGE, response_1.MESSAGE.SOMETHING_WENT_WRONG));
            }
        });
    }
}
exports.productController = productController;
