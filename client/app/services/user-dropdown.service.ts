import { LoggingService } from '../utils/loggingService';
import { UserService } from './user.services';
import { User } from '../models/User';
import * as moment from 'moment';
import { DATE_FORMATS } from '../shared/configuration';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export class UserDropDownService {
  static $inject = ['userService', 'loggingService'];
  static NAME: string = 'userDropDownService';

  constructor(private userService: UserService, private loggingService: LoggingService) {
    this.getUsers().subscribe();
  }

  selectedUser: User;
  public selectedUserHandle: Subject<number> = new Subject<number>();
  users: User[];
  term: string;

  getAge(date: string): number {
    const currentDate: moment.Moment = moment();
    const birthDay: moment.Moment = moment(date, DATE_FORMATS, true);
    return currentDate.year() - birthDay.year();
  }

  getUsers = (): Observable<User[]> => this.userService.getUsers()
    .pipe(tap(() => this.loggingService.log(UserDropDownService.NAME, 'Getting all users')), map((users) => users.map((user) => this.getDropDownUser(user))),
      tap((users) => this.users = users))

  getDropDownUser(user: User): User {
    user.age = this.getAge(user.dateOfBirth);
    return user;
  }

  getFilteredUsers(): Observable<User[]> {
    this.loggingService.log(UserDropDownService.NAME, 'Getting filtered users');
    return this.userService.getFilterUsers(this.term)
      .pipe(map((users) => users.map((user) => this.getDropDownUser(user))));
  }

  setNewSelectedUser(index: number): Observable<User> {
    if (index === -1) {
      return of(undefined);
    }
    return of(this.users[index]);
  }

}
