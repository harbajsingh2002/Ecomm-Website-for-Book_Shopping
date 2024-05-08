import express, { Response, Request } from 'express';
import { userController } from '../controllers/user.controller';
import { authcontroller } from '../controllers/auth.controller';
import auth from '../utils/auth/user.middleware';
import validationMiddleware from '../validations/user.validation';

const router = express.Router();

//Register User
router.post('/create', (req, res, next) => validationMiddleware(req, res, next, 'user'), userController.createNewUser);

//Login User
router.post('/login', (req, res, next) => validationMiddleware(req, res, next, 'login'), userController.login);

//Find all User
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), auth, userController.findAllUser);

//Find a specific user
router.get('/:id', (req, res, next) => validationMiddleware(req, res, next, 'user'), userController.findUserById);

//Update a specific user
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'user'), auth, userController.updateUser);

//Deletes a specific user
router.delete('/:id', auth, userController.deleteUser);

//ForgetPasswordS
router.post('/forgotPassword', authcontroller.forgetPassword);
// router.route('/forgetPassword').post(authcontroller.forgetPassword);

//ResetPassword
router.patch('/resetPassword/:resetToken', authcontroller.resetPassword);

export default router;
