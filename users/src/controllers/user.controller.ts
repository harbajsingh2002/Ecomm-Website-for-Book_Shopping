import { Request, Response } from 'express';
//import { valStore, loginStore } from "../validation/store.validation";
import { failAction, MESSAGE, STATUS_CODE, successAction } from '../utils/messages/response';
import { UserServices } from '../services/user.services';
import logger from '../utils/logger';

export class userController {
  //Cfreate User
  public static async createNewUser(req: Request, res: Response) {
    try {
      const data = await UserServices.createUser(req.body);
      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.add(' New User')));
      } else {
        res.status(STATUS_CODE.NOT_CREATED);
      }
    } catch (err: any) {
      logger.error(MESSAGE.errorLog('userAdd', 'userController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }

  //Login User
  public static async login(req: Request, res: Response) {
    try {
      const isUser = await UserServices.login(req.body);

      if (isUser) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, MESSAGE.login));
      } else if (isUser === '') {
        res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, isUser, MESSAGE.Invalidlogin));
      } else isUser === 'notExist';
      {
        res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('User')));
      }
    } catch (err: any) {
      logger.error(MESSAGE.errorLog('loginuser', 'userController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }

  //Get store by Id
  public static async findUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      //console.log(storeId)
      //const store = await StoreServices.getStoreById({ id: storeId });
      const findUser = await UserServices.findUserById(userId);

      if (!findUser) {
        res.status(STATUS_CODE.NOT_CREATED).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('Store not existed')));
      }

      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, findUser, MESSAGE.fetch('Store')));
    } catch (err: any) {
      logger.error(MESSAGE.errorLog('findUserById', 'userController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }

  //Get All Store
  public static async findAllUser(req: Request, res: Response) {
    try {
      console.log('gyfduhdjigf');
      const userData = await UserServices.findAllUser();
      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, userData, MESSAGE.fetch('User')));
    } catch (err: any) {
      logger.error(MESSAGE.errorLog('findAlluser', 'userController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }

  //Update store
  public static async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const findUser = await UserServices.findUserById(userId);

      if (!findUser) {
        res.status(STATUS_CODE.NOT_CREATED).json(failAction(STATUS_CODE.SUCCESS, MESSAGE.notExist('User not existed')));
      }
      const data = await UserServices.updateUser(userId, req.body);

      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.update('User')));
      }
    } catch (err: any) {
      console.log('err', err.MESSAGE);
      logger.error(MESSAGE.errorLog('updateUser', 'userController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }

  //Delete User
  public static async deleteUser(req: Request, res: Response) {
    try {
      const data = await UserServices.deleteUser(req);
      if (data) {
        res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.delete('User')));
      }
    } catch (err: any) {
      logger.error(MESSAGE.errorLog('deleteUser', 'userController', err));
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }
}
