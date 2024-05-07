import express, { Response, Request } from 'express';
import { productController } from '../controller/productController';
import imageStorage from '../utilis/fileUpload/file.upload';

const router = express.Router();

//Route to add new Book
router.post('/', productController.createNewProduct);

//route to get all the books
router.get('/', productController.getAllBooks);

//Route to get book by Id
router.get('/:id', productController.getBookById);

//router to update the book
router.put('/:id', productController.updateBook);

//router to delete the book
router.delete('/:id', productController.deleteBookById);

//router to upload image of product
router.post('/singleImage', imageStorage.single('image'), productController.uploadImage);

//route to subscribe to channel
router.get('/subscriber', productController.subscribeMessage);

export default router;
