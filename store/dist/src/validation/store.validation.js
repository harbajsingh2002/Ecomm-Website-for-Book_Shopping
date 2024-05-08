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
//
const listing = joi_1.default.object({
    limit: joi_1.default.number().required(),
    page: joi_1.default.number().required(),
    sortBy: joi_1.default.string().required(),
    sort: joi_1.default.number().required(),
    searchBy: joi_1.default.string().optional(),
    keyword: joi_1.default.string().optional(),
});
const store = joi_1.default.object({
    storeName: joi_1.default.string().min(5).max(20).optional().messages({ 'any.required': 'Name is a required' }),
    address: joi_1.default.string().max(30).required(),
    email: joi_1.default.string().email().lowercase().required().description('email should be unique'),
    password: joi_1.default.string().min(6).required(),
    contact: joi_1.default.number().integer().min(100000000).max(9999999999).required(),
    description: joi_1.default.string().min(10).max(100).required(),
});
const loginStore = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(6).required(),
});
const user = joi_1.default.object({
    name: joi_1.default.string().optional(),
    age: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().optional(),
});
const validationMiddleware = (req, res, next, schema) => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        abortEarly: false,
        allowUnknown: false,
    };
    if (schema == 'listing') {
        var { error } = listing.validate(req.query, option);
    }
    if (schema == 'store') {
        var { error } = store.validate(req.body, option);
    }
    if (schema == 'user') {
        var { error } = user.validate(req.body, option);
    }
    if (schema == 'loginStore') {
        var { error } = loginStore.validate(req.body, option);
    }
    if (error) {
        res.status(400).json({ validationError: error.details[0].message });
    }
    else {
        next();
    }
});
exports.default = validationMiddleware;
