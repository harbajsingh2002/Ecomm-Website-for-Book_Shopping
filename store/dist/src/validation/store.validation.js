"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const valStore = joi_1.default.object({
    storeName: joi_1.default
        .string()
        .min(5)
        .max(20)
        .optional()
        .messages({ 'any.required': 'Name is a required' }),
    address: joi_1.default.string().max(30).required(),
    email: joi_1.default
        .string()
        .email()
        .lowercase()
        .required()
        .description('email should be unique'),
    password: joi_1.default.string().min(6).required(),
    contact: joi_1.default.number().integer().min(100000000).max(9999999999).required(),
    description: joi_1.default.string().min(10).max(100).required(),
});
const loginStore = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.default = { valStore, loginStore };
