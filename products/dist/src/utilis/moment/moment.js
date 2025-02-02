"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const timeStamp = {
    created_At: {
        type: Number,
        default: (0, moment_1.default)(),
    },
    deleted_At: {
        type: Number,
        default: (0, moment_1.default)(),
    },
    deleted_by: {
        type: Number,
        default: (0, moment_1.default)(),
    },
    is_deleted_: {
        type: Number,
        default: (0, moment_1.default)(),
    },
};
exports.default = timeStamp;
