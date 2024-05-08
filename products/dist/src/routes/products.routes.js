"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const file_upload_1 = __importDefault(require("../utilis/fileUpload/file.upload"));
const product_validation_1 = __importDefault(require("../validation/product.validation"));
const router = express_1.default.Router();
//Route to add new Book
router.post('/', (req, res, next) => (0, product_validation_1.default)(req, res, next, 'product'), productController_1.productController.createNewProduct);
//login product
router.post('/login', (req, res, next) => (0, product_validation_1.default)(req, res, next, 'login'));
//route to get all the books
router.get('/', (req, res, next) => (0, product_validation_1.default)(req, res, next, 'listing'), productController_1.productController.getAllBooks);
//Route to get book by Id
router.get('/:id', (req, res, next) => (0, product_validation_1.default)(req, res, next, 'listing'), productController_1.productController.getBookById);
//router to update the book
router.put('/:id', (req, res, next) => (0, product_validation_1.default)(req, res, next, 'product'), productController_1.productController.updateBook);
//router to delete the book
router.delete('/:id', productController_1.productController.deleteBookById);
//router to upload image of product
router.post('/singleImage', file_upload_1.default.single('image'), productController_1.productController.uploadImage);
exports.default = router;
