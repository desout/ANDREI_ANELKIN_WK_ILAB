import { Request, Response } from 'express';
import * as userModule from './userModule';
import { User } from './User';
import { SECRET_TOKEN } from './middleware';
import { checkUser, getUserById, getUserByName, updateUser } from './userModule';
import { sign, verify, VerifyErrors } from 'jsonwebtoken';
import * as jwt_decode from 'jwt-decode';

export interface UpdatePasswordUser {
  name: string;
  oldPassword: string;
  newPassword: string;
}

function getExportUser(user: User): User {
  return {
    id: user.id,
    name: user.name,
    dateOfBirth: user.dateOfBirth,
    dateOfFirstLogin: user.dateOfFirstLogin,
    dateNextNotification: user.dateNextNotification,
    information: user.information,
    role: user.role
  } as User;
}

export function getUserFn(req: Request, res: Response): void {
  const user: User | undefined = userModule.getUserById(req.params.id);
  setTimeout(() => {
    if (user !== undefined) {
      res.send(getExportUser(user));
    } else {
      res.sendStatus(400);
    }
  }, 1000);
}

export function getUsersFn(req: Request, res: Response): void {
  const users: User[] = userModule.getUsers();
  const exportUsers: User[] = [];
  setTimeout(() => {
    for (const user of users) {
      exportUsers.push(getExportUser(user));
    }
    res.send(exportUsers);
  }, 1000);
}

export function addUserFn(req: Request, res: Response): void {
  const user: User = req.body as User;
  const retUser: User | undefined = userModule.addUser(user);
  if (retUser !== undefined) {
    res.send(getExportUser(retUser));
  } else {
    res.sendStatus(400);
  }
}

export function deleteUserFn(req: Request, res: Response): void {
  const user: User | undefined = userModule.deleteUser(req.params.id);
  if (user !== undefined) {
    res.send(getExportUser(user));
  } else {
    res.sendStatus(400);
  }
}

export function updateUserFn(req: Request, res: Response): void {
  const user: User = <User>req.body;
  const retUser: User | undefined = userModule.updateUser(user, req.params.id);
  if (retUser !== undefined) {
    res.send(getExportUser(retUser));
  } else {
    res.sendStatus(400);
  }
}

export function checkUserExist(req: Request, res: Response): void {
  const user: User | undefined = userModule.getUserByName(req.params.name);
  setTimeout(() => {
    if (user !== undefined) {
      res.send(true);
    } else {
      res.send(false);
    }
  }, 1000);
}

export function checkTokenAuth(req: Request, res: Response) {
  const {authorization} = req.cookies;

  if (authorization) {

    verify(authorization, SECRET_TOKEN, undefined, (err: VerifyErrors, decoded: string | object) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.params.decoded = decoded;
        return res.json({
          success: true,
          message: 'Token is valid'
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
  return undefined;
}

export function loginUserFn(req: Request, res: Response) {
  const username = req.body.name;
  const password = req.body.password;

  if (username && password) {
    if (checkUser(username, password)) {
      const user = getUserByName(username);
      if (user !== undefined) {
        const token = sign({username: username},
          SECRET_TOKEN,
          {expiresIn: '24h', subject: user.id!.toString()},
        );
        res.cookie('authorization', token, {httpOnly: true}).json({
          success: true,
          message: 'Authentication successful!',
          token: token,
          object: JSON.stringify(getExportUser(user))
        });
      }
    } else {
      res.json({
        success: false,
        message: 'Incorrect username or password',
        object: null
      });
    }
  } else {
    res.json({
      success: false,
      message: 'Authentication failed! Please check the request',
      object: null
    });
  }
}

export function logoutUserFn(req: Request, res: Response) {
  res.clearCookie('authorization').send();
}

export function updatePasswordFn(req: Request, res: Response): void {
  const user: UpdatePasswordUser = req.body as UpdatePasswordUser;
  const isComplete: boolean = userModule.updatePassword(user);
  if (isComplete) {
    res.send(true);
  } else {
    res.send(false);
  }
}

export function getUsersFilterFn(req: Request, res: Response): void {

  const name: string = req.body.name as string;
  const users: User[] = userModule.getFilterUsers(name);
  const exportUsers: User[] = [];
  setTimeout(() => {
    for (const user of users) {
      exportUsers.push(getExportUser(user));
    }
    res.send(exportUsers);
  }, 200);
}

export function getCurrentUserFn(req: Request, res: Response): void {
  const {authorization} = req.cookies;
  const tokenInfo = jwt_decode(authorization);
  const id: number = (<any>tokenInfo)['sub'];
  const user = getUserById(id);
  setTimeout(() => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  }, 1000);
}

export function updateCurrentUserFn(req: Request, res: Response): void {
  const {authorization} = req.cookies;
  const tokenInfo = jwt_decode(authorization);
  const id: number = (<any>tokenInfo)['sub'];
  const user = req.body as User;
  const newUser = updateUser(user, id);
  if (newUser) {
    res.json(newUser);
  } else {
    res.sendStatus(400);
  }
}
