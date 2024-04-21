import { Request, Response } from 'express'
import Store from '../model/products.model'
import {
  MESSAGE,
  STATUS_CODE,
  failAction,
  successAction,
} from '../utilis/messages/response'
import { BooksServices } from '../services/products.services'

export class productController {
  public static async createNewProduct(req: Request, res: Response) {
    try {
      // const { error } = valStore.validate(req.body);
      // if (error) {
      //   return res.status(400).json({
      //     error: error.details.map((err: { message: string }) =>
      //       err.message.replace(/"/g, "")
      //     ),
      //   });
      // }
      const data = await BooksServices.createNewBook(req.body)
      if (data) {
        res
          .status(STATUS_CODE.SUCCESS)
          .json(successAction(STATUS_CODE.SUCCESS, data, MESSAGE.add('Store')))
      } else {
        res.status(STATUS_CODE.NOT_CREATED)
      }
    } catch (err: any) {
      // logger.error(message.errorLog('productAdd', 'productController', err))
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          failAction(
            STATUS_CODE.BAD_REQUEST,
            err.MESSAGE,
            MESSAGE.SOMETHING_WENT_WRONG,
          ),
        )
    }
  }
}
