import { UserDropDownService } from '../../../services/user-dropdown.service';
import { UserListFactory } from '../../../factories/UserListFactory';
import './user-list.component.scss';

export class UserListController implements ng.IController {
  static $inject = ['userDropDownService', 'userListFactory'];

  constructor(public userDropDownService: UserDropDownService, public userListFactory: UserListFactory) {
  }
}

export class UserListComponent implements ng.IComponentOptions {
  static NAME: string = 'userListComponent';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = UserListController;
    this.templateUrl = require('./user-list.component.html');
  }

}
