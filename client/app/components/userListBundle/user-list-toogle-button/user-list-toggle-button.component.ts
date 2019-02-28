import { UserListFactory } from '../../../factories/UserListFactory';
import './user-list-toggle-button.component.scss';

export class UserListToggleButtonController implements ng.IController {
  static $inject = ['userListFactory'];

  constructor(private userListFactory: UserListFactory) {
  }

  onToggleClick() {
    this.userListFactory.isToggled = !this.userListFactory.isToggled;
  }
}

export class UserListToggleButtonComponent implements ng.IComponentOptions {
  static NAME: string = 'userListToggleButtonComponent';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = UserListToggleButtonController;
    this.templateUrl = require('./user-list-toggle-button.component.html');
  }

}