import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGE, STATUS_CODE, failAction } from '../messages/response';

async function auth(req: Request, res: Response, next: () => void) {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json(failAction(STATUS_CODE.UNAUTHORIZED, MESSAGE.INVALID_TOKEN));
    }

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    try {
      const verified = jwt.verify(token, process.env.TOKEN_KEY as string);

      if (verified) {
        next();
      } else {
        // Access Denied
        res.status(STATUS_CODE.TOKEN_EXPIRED).json(failAction(STATUS_CODE.TOKEN_EXPIRED, MESSAGE.TOKEN_EXPIRED));
      }
    } catch (error) {
      // Token verification failed
      res.status(STATUS_CODE.UNAUTHORIZED).json(failAction(STATUS_CODE.UNAUTHORIZED, MESSAGE.INVALID_TOKEN));
    }
  } catch (error) {
    // Internal server error
    console.error('Error:', error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(failAction(STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGE.INTERNAL_SERVER_ERROR));
  }
}

export default auth;
