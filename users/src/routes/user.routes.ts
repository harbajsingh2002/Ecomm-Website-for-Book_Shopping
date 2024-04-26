import express, { Response, Request } from 'express';
import { userController } from '../controllers/user.controller';
import { authcontroller } from '../controllers/auth.controller';
import auth from '../utils/auth/user.middleware';
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

//Register User
router.post('/create', userController.createNewUser);

//Login User
router.post('/login', userController.login);

//Find all User
router.get('/', auth, userController.findAllUser);

//Find a specific user
router.get('/:id', userController.findUserById);

//Update a specific user
router.put('/:id', auth, userController.updateUser);

//Deletes a specific user
router.delete('/:id', auth, userController.deleteUser);

//ForgetPassword
router.post('/forgotPassword', authcontroller.forgetPassword);
// router.route('/forgetPassword').post(authcontroller.forgetPassword);

//ResetPassword
router.patch('/resetPassword/:resetToken', authcontroller.resetPassword);

export default router;
