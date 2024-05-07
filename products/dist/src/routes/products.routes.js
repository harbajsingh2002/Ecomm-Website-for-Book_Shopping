"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const file_upload_1 = __importDefault(require("../utilis/fileUpload/file.upload"));
const router = express_1.default.Router();
//Route to add new Book
router.post('/', productController_1.productController.createNewProduct);
//route to get all the books
router.get('/', productController_1.productController.getAllBooks);
//Route to get book by Id
router.get('/:id', productController_1.productController.getBookById);
//router to update the book
router.put('/:id', productController_1.productController.updateBook);
//router to delete the book
router.delete('/:id', productController_1.productController.deleteBookById);
//router to upload image of product
router.post('/singleImage', file_upload_1.default.single('image'), productController_1.productController.uploadImage);
//route to subscribe to channel
router.post('/subscriber', productController_1.productController.subscribeMessages);
exports.default = router;
