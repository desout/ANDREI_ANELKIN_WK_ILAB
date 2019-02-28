
export interface User {
  id?: number;
  age?: number;
  name: string;
  password?: string;
  dateOfBirth: string;
  dateOfFirstLogin: string;
  dateNextNotification: string;
  information: string;
  token?: string;
  role: string;

}
export function createUser(name: string,
                           password: string,
                           dateOfBirth: string,
                           dateOfFirstLogin: string,
                           dateNextNotification: string,
                           information: string,
                           role: string): User {
  return {
    name: name,
    password: password,
    dateOfBirth: dateOfBirth,
    dateOfFirstLogin: dateOfFirstLogin,
    dateNextNotification: dateNextNotification,
    information: information,
    role: role
  };
}

