import express, { Response, Request } from 'express'
import { productController } from '../controller/products.controller'

const router = express.Router()

//ROute to add new Book
router.post('/create', productController.createNewProduct)

//route to get all the books
router.get('/books', productController.getAllBooks)

//Route to get book by Id
router.get('/:id', productController.getBookById)

//router to update the book
router.put('/:id', productController.updateBook)

//router to delete the book
router.delete('/:id', productController.deleteBookById)

export default router
