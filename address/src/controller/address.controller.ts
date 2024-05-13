import { Request, Response } from 'express';
import { MESSAGE, STATUS_CODE, failAction, successAction } from '../utilis/messages/response';
import { createAddress, getAddressById, updateAddress, deleteAddress } from '../services/address.services';

// create address

async function createAddresses(req: Request, res: Response) {
  try {
    const address = await createAddress(req.body);
    res.status(201).json(successAction(STATUS_CODE.SUCCESS, MESSAGE.add('address')));
  } catch (err: any) {
    res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
  }
}

//get address by id

async function getAddressByIds(req: Request, res: Response) {
  try {
    const address = await getAddressById(req.params.id);
    if (!address) {
      return res.status(404).json(successAction(STATUS_CODE.NOT_FOUND, MESSAGE.notExist('address')));
    }
    res.json(address);
  } catch (err: any) {
    res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
  }
}

// update address of the user

async function updateAddresses(req: Request, res: Response) {
  try {
    const address = await updateAddress(req.params.id, req.body);
    if (!address) {
      return res.status(404).json(successAction(STATUS_CODE.NOT_FOUND, MESSAGE.notExist));
    }
    res.json(address);
  } catch (err: any) {
    res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
  }
}

// delete address

async function deleteAddresses(req: Request, res: Response) {
  try {
    await deleteAddress(req.params.id);
    res.json(successAction(STATUS_CODE.SUCCESS, MESSAGE.delete));
  } catch (err: any) {
    res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, err.MESSAGE, MESSAGE.SOMETHING_WENT_WRONG));
  }
}

export default { createAddresses, getAddressByIds, updateAddresses, deleteAddresses };
