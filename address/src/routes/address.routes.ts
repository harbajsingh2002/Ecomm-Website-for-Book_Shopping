import express, { Response, Request } from 'express';
import addressController from '../controller/address.controller';

const router = express.Router();

//Route to add new  address
router.post('/create', addressController.createAddresses);

//route to get by id address
router.get('/getById/:id', addressController.getAddressByIds);

//Route to update address by Id
router.patch('/update/:id', addressController.updateAddresses);

//router to delete the book
router.delete('/:id', addressController.deleteAddresses);

export default router;
