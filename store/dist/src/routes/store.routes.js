"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import Store from "../model/store.model";
const store_controller_1 = require("../controller/store.controller");
const store_validation_1 = __importDefault(require("../validation/store.validation"));
const router = express_1.default.Router();
//Route to create store
router.post('/', (req, res, next) => (0, store_validation_1.default)(req, res, next, 'store'), store_controller_1.StoreController.createNewStore);
//login store
router.post('/login', (req, res, next) => (0, store_validation_1.default)(req, res, next, 'login'), store_controller_1.StoreController.login);
//listing of store
router.get('/', (req, res, next) => (0, store_validation_1.default)(req, res, next, 'listing'), store_controller_1.StoreController.getAllStore);
///Route to get specific store
router.get('/:id', (req, res, next) => (0, store_validation_1.default)(req, res, next, 'store'), store_controller_1.StoreController.getStoreById);
///Route to update store
router.put('/:id', (req, res, next) => (0, store_validation_1.default)(req, res, next, 'store'), store_controller_1.StoreController.updateStore);
///Route to delete store
router.delete('/:id', store_controller_1.StoreController.deleteStore);
exports.default = router;
