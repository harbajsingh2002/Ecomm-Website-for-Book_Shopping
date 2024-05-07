"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import Store from "../model/store.model";
const store_controller_1 = require("../controller/store.controller");
const router = express_1.default.Router();
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const newStore = new Store(req.body);
//     const store = await newStore.save();
//     res.json(store);
//   } catch (error) {
//     res.status(400).json({ error: "failed to create store" });
//   }
// });
//Route to add new Store
router.post('/', store_controller_1.StoreController.createNewStore);
//route to login
router.post('/login', store_controller_1.StoreController.login);
//route to get all the Store
router.get('/', store_controller_1.StoreController.getAllStore);
//route to get all the store
router.get('/:id', store_controller_1.StoreController.getStoreById);
//router to update the store
router.put('/:id', store_controller_1.StoreController.updateStore);
//router to delete Store
router.delete('/:id', store_controller_1.StoreController.deleteStore);
//router to publish the message
router.post('/publisher', store_controller_1.StoreController.publishMessage);
exports.default = router;
