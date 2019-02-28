import { User } from '../models/User';
import { UpdatePasswordUser } from '../models/UpdatePasswordUser';
import * as moment from 'moment';
import { DATE_FORMATS } from '../shared/configuration';
import { IHttpResponse } from 'angular';
import { IScope } from 'angularjs';
import { LoggingService } from '../utils/loggingService';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export class UserService {
  static $inject = ['$q', '$http', '$rootScope', 'loggingService'];
  static NAME: string = 'userService';

  constructor(protected $q: ng.IQService, protected $http: ng.IHttpService, private scope: IScope, private loggingService: LoggingService) {
    this.getCurrentUser().subscribe();
    this.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (!scope.$$phase) {
        scope.$digest();
      }
    });
  }

  private rootUrl = 'http://localhost:8000';
  currentUser: User;
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  getUsers(): Observable<User[]> {
    const url = `${this.rootUrl}/users`;
    this.loggingService.log(UserService.NAME, `Get all users`);
    return from(this.$http.get<User[]>(url)
      .then((res: IHttpResponse<User[]>) => res.data))
      .pipe(map((users: User[]) => users.map((user) => this.getLocalUser(user))));
  }

  getUser(id: number): Observable<User> {
    const url = `${this.rootUrl}/users/${id}`;
    this.loggingService.log(UserService.NAME, `Get user by id`);
    return from(this.$http.get<User>(url)
      .then((res: IHttpResponse<User>) => res.data))
      .pipe(map((user) => this.getLocalUser(user)));
  }

  addUser(user: User): Observable<User> {
    const url = `${this.rootUrl}/users/add`;
    this.loggingService.log(UserService.NAME, `Add user`);
    return from(this.$http.post<User>(url, this.getUserForAddSend(user))
      .then((res: IHttpResponse<User>) => res.data));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.rootUrl}/users/${user.id}`;
    this.loggingService.log(UserService.NAME, `Update user`);
    return from(this.$http.put<User>(url, this.getUserForSend(user))
      .then((res: IHttpResponse<User>) => res.data));
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.rootUrl}/users/${id}`;
    this.loggingService.log(UserService.NAME, 'deleting user');
    return from(this.$http.delete<User>(url)
      .then(((res: IHttpResponse<User>) => res.data)))
      .pipe(map((user) => this.getLocalUser(user)));
  }

  updatePassword(user: UpdatePasswordUser): Observable<boolean> {
    const url = `${this.rootUrl}/account/updatePassword`;
    this.loggingService.log(UserService.NAME, `Update password user`);
    return from(this.$http.post<boolean>(url, user).then(((res: IHttpResponse<boolean>) => res.data)));
  }

  checkUser(name: string): Observable<boolean> {
    const url = `${this.rootUrl}/users/check/${name}`;
    this.loggingService.log(UserService.NAME, `Check user by name`);
    return from(this.$http.get<boolean>(url).then(((res: IHttpResponse<boolean>) => res.data)));
  }

  getFilterUsers(term: string): Observable<User[]> {
    const url = `${this.rootUrl}/users/search`;
    this.loggingService.log(UserService.NAME, `Getting filtered user`);
    return from(this.$http.post<User[]>(url, {name: term})
      .then(((res: IHttpResponse<User[]>) => res.data)))
      .pipe(map((users: User[]) => users.map((user) => this.getLocalUser(user))));
  }

  updateCurrentUser(user: User): Observable<User> {
    const url = `${this.rootUrl}/currentUser`;
    this.loggingService.log(UserService.NAME, `Updating current user`);
    return from(this.$http.put<User>(url, user)
      .then(((res: IHttpResponse<User>) => res.data)))
      .pipe(map((letUser) => this.getLocalUser(letUser)),
        tap((user) => this.updateLocalCurrentUser(user)));
  }

  updateLocalCurrentUser(user: User): void {
    this.loggingService.log(UserService.NAME, `Updating local current user`);
    this.currentUser$.next(user ? this.getLocalUser(user) : null);
  }

  getCurrentUser(): Observable<User> {
    const url = `${this.rootUrl}/currentUser`;
    this.loggingService.log(UserService.NAME, `Getting current user`);
    return from(this.$http.get<User>(url)
      .then(((res: IHttpResponse<User>) => res.data))
      .catch(() => undefined))
      .pipe(map((user) => {
        if (user === 'Bad Request') {
          user = null;
        } else {
          user = this.getLocalUser(user);
        }
        this.updateLocalCurrentUser(user);
        return user;
      }));
  }

  getUserForSend(user: User): User {
    return {
      name: user.name,
      dateOfBirth: this.getUTCDate(user.dateOfBirth),
      dateOfFirstLogin: this.getUTCDate(user.dateOfFirstLogin),
      dateNextNotification: this.getUTCDate(user.dateNextNotification),
      information: user.information,
      role: user.role
    };
  }

  getUserForAddSend(user: User): User {
    return {
      name: user.name,
      password: user.password,
      dateOfBirth: this.getUTCDate(user.dateOfBirth),
      dateOfFirstLogin: this.getUTCDate(user.dateOfFirstLogin),
      dateNextNotification: this.getUTCDate(user.dateNextNotification),
      information: user.information,
      role: user.role
    };
  }

  getLocalUser(user: User): User {
    return {
      id: user.id,
      name: user.name,
      dateOfBirth: this.getLocalDate(user.dateOfBirth),
      dateOfFirstLogin: this.getLocalDate(user.dateOfFirstLogin),
      dateNextNotification: this.getLocalDate(user.dateNextNotification),
      information: user.information,
      role: user.role
    };
  }

  getLocalDate = (date: string): string => moment.utc(date).format(DATE_FORMATS[0]).toString();
  getUTCDate = (date: string): string => moment(date, DATE_FORMATS, true).utc().toString();
}
