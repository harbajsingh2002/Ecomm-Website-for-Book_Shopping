import { Request, Response } from 'express';
//import { valStore, loginStore } from "../validation/store.validation";
import { failAction, MESSAGE, STATUS_CODE, successAction } from '../utilis/messages/response';
import { StoreServices } from '../services/store.services';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
export class StoreController {
  public static async createNewStore(req: Request, res: Response) {
    try {
      // const { error } = valStore.validate(req.body);
      // if (error) {
      //   return res.status(400).json({
      //     error: error.details.map((err: { message: string }) =>
      //       err.message.replace(/"/g, "")
      //     ),
      //   });
      // }
      const data = await StoreServices.createNewStore(req.body);
      if (!data) {
        res.status(STATUS_CODE.NOT_CREATED);
      }
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.add('Store')));
    } catch (err: any) {
      // logger.error(message.errorLog('productAdd', 'productController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      // const { error } = loginStore.validate(req.body);
      // if (error) {
      //   return res.status(400).json({
      //     error: error.details.map((err: { message: string }) =>
      //       err.message.replace(/"/g, "")
      //     ),
      //   });
      // }

      // const isStore = await StoreServices.login(email, password);

      if (!email || !password) {
        throw new Error(email ? 'email' : 'password' + 'are required');
      }

      // Find the store based on the provided email
      const store = await StoreServices.getByAttribute({ email });
      if (!store) {
        throw new Error('Store not found');
      }

      const isPasswordValid = await bcrypt.compare(password, store.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ storeId: store._id, email }, process.env.Token_Key!, { expiresIn: '30min' });

      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, { _id: store._id, email: store.email, token: token }, MESSAGE.LOGIN));

      // if (isStore) {
      //   res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, isStore, MESSAGE.LOGIN));
      // } else if (isStore === 'invalidStore') {
      //   res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, isStore, MESSAGE.Invalidlogin));
      // } else isStore === 'notExist';
      // {
      //   res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Store')));
      // }
    } catch (err: any) {
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNET_SERVER_ERROR));
    }
  }

  //Get store by Id
  public static async getStoreById(req: Request, res: Response) {
    try {
      const storeId = req.params.id;
      const findStore = await StoreServices.getStoreById(storeId);
      if (!findStore) {
        res.status(STATUS_CODE.NOT_CREATED).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Store not existed')));
      }

      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, findStore, MESSAGE.fetch('Store')));
    } catch (err: any) {
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNET_SERVER_ERROR));
    }
  }

  //Get All Store
  public static async getAllStore(req: Request, res: Response) {
    try {
      console.log('gyfduhdjigf');
      const storeData = await StoreServices.getAllStore();
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, storeData, MESSAGE.fetch('Store')));
    } catch (err: any) {
      //logger.error(MESSAGE.errorLog('storeList', 'storeController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNET_SERVER_ERROR));
    }
  }

  //Update store
  public static async updateStore(req: Request, res: Response) {
    try {
      const storeId = req.params.id;
      //const { name, address, email, password, contact } = req.body;

      const findStore = await StoreServices.getStoreById(storeId);

      if (!findStore) {
        res.status(404).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Store not existed')));
      }
      const data = await StoreServices.updateStore(storeId, req.body);

      //const data = await StoreServices.updateStore({id:req.params});
      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.update('Store')));
      }
    } catch (err: any) {
      console.log('err', err.MESSAGE);
      //logger.error(MESSAGE.errorLog('storeUpdate', 'storeController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNET_SERVER_ERROR));
    }
  }

  //Delete Store
  public static async deleteStore(req: Request, res: Response) {
    try {
      const data = await StoreServices.deleteStore(req);
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, MESSAGE.delete('Store')));
    } catch (err: any) {
      //logger.error(MESSAGE.errorLog('userDelete', 'userController', err))
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNET_SERVER_ERROR));
    }
  }
}
