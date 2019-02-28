import { UserDropDownService } from '../../../services/user-dropdown.service';
import './user-list-toggle.component.scss';

export class UserListToggleController implements ng.IController {
  static $inject = ['userDropDownService'];

  constructor(public userDropdownService: UserDropDownService) {
  }

  ngOnInit() {

  }

}

export class UserListToggleComponent implements ng.IComponentOptions {
  static NAME: string = 'userListToggleComponent';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = UserListToggleController;
    this.templateUrl = require('./user-list-toggle.component.html');
  }

}