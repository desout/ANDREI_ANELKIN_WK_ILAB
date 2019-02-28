import { UserDropDownService } from '../../../services/user-dropdown.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import './users-search.component.scss';

export class UsersSearchController implements ng.IController {
  searching = false;
  static $inject = ['userDropDownService'];
  public searchUsersTerm: Subject<string> = new Subject<string>();

  constructor(private userDropDownService: UserDropDownService) {
    this.searchUsersTerm
      .pipe(
        debounceTime(500),
        tap(() => this.searching = true),
        switchMap((term: string) => {
          this.userDropDownService.term = term;
          return this.userDropDownService.getFilteredUsers();
        }),
        tap(() => this.searching = false))
      .subscribe((users) => this.userDropDownService.users = users);
  }

  ngOnInit() {
    this.search('');
  }

  search(term: string) {
    this.searchUsersTerm.next(term);
  }
}

export class UsersSearchComponent implements ng.IComponentOptions {
  static NAME: string = 'usersSearchComponent';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = UsersSearchController;
    this.templateUrl = require('./users-search.component.html');
  }

}