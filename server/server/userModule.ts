import { User } from './User';
import { UpdatePasswordUser } from './serverWorker';

const users: User[] = require('../assets/users.json');

export function getUserById(id: number): User | undefined {
  if (users[id]) {
    return users[id];
  }
  return undefined;
}

export const getUserByName = (name: string): User | undefined => {
  return users.find((user) => user.name === name);
};

export function getUsers(): User[] {
  return users;
}

export function updateUser(user: User, id: number): User | undefined {
  if (users[id]) {
    user.id = id;
    user.password = users[id].password;
    users[id] = user;
    return user;
  }
  return undefined;
}

export function addUser(user: User): User | undefined {
  user.id = getNewId();
  if (!getUserByName(user.name)) {
    users.push(user);
    return user;
  }
  return undefined;
}

export function deleteUser(id: number): User | undefined {
  if (id && users[id] && users.length > 1) {
    return users.splice(id, 1).pop();
  }
  return undefined;
}

export function checkUser(login: string, password: string): boolean {
  const user: User | undefined = users.find((userL) => userL.name === login && userL.password === password);
  return user !== undefined;
}

export function updatePassword(user: UpdatePasswordUser): boolean {
  const localUser: User | undefined = getUserByName(user.name);
  if (localUser !== undefined) {
    if (localUser.password === user.oldPassword) {
      if (localUser.id !== undefined) {
        const id: number = localUser.id;
        users[id].password = user.newPassword;
        return true;
      }
    }
    return false;
  }
  return false;
}

export function getFilterUsers(name: string): User[] {
  if (name !== '') {
    return getUsers().filter((user) => user.name.startsWith(name));
  } else {
    return getUsers();
  }
}

function getNewId() {
  const prevId: number = Number(users[users.length - 1].id);
  return prevId + 1;
}

