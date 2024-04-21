import express, { Response, Request } from "express";
//import Store from "../model/store.model";
import { StoreController } from "../controller/store.controller";
const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const newStore = new Store(req.body);
//     const store = await newStore.save();
//     res.json(store);
//   } catch (error) {
//     res.status(400).json({ error: "failed to create store" });
//   }
// });

router.post("/create", StoreController.createNewStore);
router.post("/login", StoreController.login);
router.get("/all", StoreController.getAllStore);
router.get("/:id", StoreController.getStoreById);
router.put("/:id", StoreController.updateStore);
router.delete("/:id", StoreController.deleteStore);

export default router;
