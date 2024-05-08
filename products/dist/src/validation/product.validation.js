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
const joi_1 = __importDefault(require("joi"));
const listing = joi_1.default.object({
    limit: joi_1.default.number().required(),
    page: joi_1.default.number().required(),
    sortBy: joi_1.default.string().required(),
    sort: joi_1.default.number().required(),
    searchBy: joi_1.default.string().optional(),
    keyword: joi_1.default.string().optional(),
});
const product = joi_1.default.object({
    title: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    price: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
});
const validationMiddleware = (req, res, next, schema) => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        abortEarly: false,
        allowUnknown: false,
    };
    if (schema == 'listing') {
        var { error } = listing.validate(req.query, option);
    }
    if (schema == 'product') {
        var { error } = product.validate(req.body, option);
    }
    if (error) {
        res.status(400).json({ validationError: error.details[0].message });
    }
    else {
        next();
    }
});
exports.default = validationMiddleware;
