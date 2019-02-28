import {verify, VerifyErrors} from 'jsonwebtoken';

export const SECRET_TOKEN = 'gfndnkxgdnodgfohifdgohigfhoid';
import {Request, Response} from 'express';

export const checkToken = (req: Request, res: Response, next: any ) => {
  const { authorization } = req.cookies ;
  if (authorization) {

    verify(authorization, SECRET_TOKEN, undefined, (err: VerifyErrors) => {
      if (err) {
        return res.sendStatus(400).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        next();
        return res;
      }
    });
  } else {
    return  res.sendStatus(400).json({
      success: false,
      message: 'auth token is not supplied'
    });
  }
  return res;
};
