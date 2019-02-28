import { UserDropDownService } from '../../../services/user-dropdown.service';
import './edit-users.component.scss';
import { AdminFactory } from '../../../factories/AdminFactory';
import { ITimeoutService } from 'angularjs';

export class EditUsersController implements ng.IController {
  static $inject = ['userDropDownService', 'adminFactory', '$timeout'];

  constructor(private dropdownService: UserDropDownService, private adminFactory: AdminFactory, private timeout: ITimeoutService) {
  }

  ngOnInit(): void {
  }

  onClickEdit(): void {
    this.adminFactory.showEdit = false;

    this.timeout(() => this.adminFactory.showEdit = true, 100);
  }

  onClickNew(): void {
    this.dropdownService.selectedUserHandle.next(-1);
    this.adminFactory.showEdit = false;

    this.timeout(() => this.adminFactory.showEdit = true, 100);
  }
}

export class EditUsersComponent implements ng.IComponentOptions {
  static NAME: string = 'editUsersComponent';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = EditUsersController;
    this.templateUrl = require('./edit-users.component.html');
  }

}
