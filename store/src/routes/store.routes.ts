import express, { Response, Request } from 'express';
//import Store from "../model/store.model";
import { StoreController } from '../controller/store.controller';
import validationMiddleware from '../validation/store.validation';
const router = express.Router();

//Route to create store
router.post('/', (req, res, next) => validationMiddleware(req, res, next, 'store'), StoreController.createNewStore);

//login store
router.post('/login', (req, res, next) => validationMiddleware(req, res, next, 'login'), StoreController.login);

//listing of store
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), StoreController.getAllStore);

///Route to get specific store
router.get('/:id', (req, res, next) => validationMiddleware(req, res, next, 'store'), StoreController.getStoreById);

///Route to update store
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'store'), StoreController.updateStore);

///Route to delete store
router.delete('/:id', StoreController.deleteStore);

export default router;
