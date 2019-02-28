import { UserService } from '../../services/user.services';

class UserInfoTabController implements ng.IController {
  static $inject = ['userService', '$state'];

  constructor(public userService: UserService, public $state: ng.ui.IStateService) {
  }

}

export class UserInfoTabComponent implements ng.IComponentOptions {
  static NAME: string = 'userInfoTab';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = UserInfoTabController;
    this.templateUrl = require('./user-info-tab.component.html');
  }

}
