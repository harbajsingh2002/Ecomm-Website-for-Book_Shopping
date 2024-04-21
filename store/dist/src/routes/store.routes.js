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
router.post("/create", store_controller_1.StoreController.createNewStore);
router.post("login", store_controller_1.StoreController.login);
router.get("/:id", store_controller_1.StoreController.getStoreById);
router.put("/:id", store_controller_1.StoreController.updateStore);
router.delete("/:id", store_controller_1.StoreController.deleteStore);
exports.default = router;
