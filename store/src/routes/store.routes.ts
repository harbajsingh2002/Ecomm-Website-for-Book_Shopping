import express, { Response, Request } from 'express';
//import Store from "../model/store.model";
import { StoreController } from '../controller/store.controller';
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
//Route to add new Store
router.post('/', StoreController.createNewStore);

//route to login
router.post('/login', StoreController.login);

//route to get all the Store
router.get('/', StoreController.getAllStore);

//route to get all the store
router.get('/:id', StoreController.getStoreById);

//router to update the store
router.put('/:id', StoreController.updateStore);

//router to delete Store
router.delete('/:id', StoreController.deleteStore);

//router to publish the message
router.post('/publisher', StoreController.publishMessage);
export default router;
