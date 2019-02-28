import { UserDropDownService } from '../../../services/user-dropdown.service';
import { IScope } from 'angular';
import { switchMap } from 'rxjs/operators';
import { UserListFactory } from '../../../factories/UserListFactory';
import './user-list-view.component.scss';

export class UserListViewController implements ng.IController {
  public loading = false;
  static $inject = ['$scope', 'userDropDownService', 'userListFactory'];

  constructor(private scope: IScope, private userDropDownService: UserDropDownService, private userListFactory: UserListFactory) {
  }

  ngOnInit(): void {
    this.userDropDownService.selectedUserHandle
      .pipe(
        switchMap((index: number) => this.userDropDownService.setNewSelectedUser(index)))
      .subscribe((user) => this.userDropDownService.selectedUser = user);
  }

  onItemClick(index: number): void {
    this.userListFactory.isToggled = false;
    this.userDropDownService.selectedUserHandle.next(index);

  }
}

export class UserListViewComponent implements ng.IComponentOptions {
  static NAME: string = 'userListViewComponent';
  controller: any;
  templateUrl: any;
  bindings: any;

  constructor() {
    this.controller = UserListViewController;
    this.templateUrl = require('./user-list-view.component.html');
    this.bindings = {
      isToggled: '='
    };
  }
}
