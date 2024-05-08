import express, { Response, Request } from 'express';
import { productController } from '../controller/productController';
import imageStorage from '../utilis/fileUpload/file.upload';
import validationMiddleware from '../validation/product.validation';

const router = express.Router();

//Route to add new Book
router.post('/', (req, res, next) => validationMiddleware(req, res, next, 'product'), productController.createNewProduct);

//login product
router.post('/login', (req, res, next) => validationMiddleware(req, res, next, 'login'));

//route to get all the books
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), productController.getAllBooks);

//Route to get book by Id
router.get('/:id', (req, res, next) => validationMiddleware(req, res, next, 'listing'), productController.getBookById);

//router to update the book
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'product'), productController.updateBook);

//router to delete the book
router.delete('/:id', productController.deleteBookById);

//router to upload image of product
router.post('/singleImage', imageStorage.single('image'), productController.uploadImage);

export default router;
