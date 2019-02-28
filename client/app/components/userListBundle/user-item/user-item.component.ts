import './user-item.component.scss';

class UserItemController implements ng.IController {

  constructor() {
  }
}

export class UserItemComponent implements ng.IComponentOptions {
  static NAME: string = 'userItemComponent';
  controller: any;
  templateUrl: any;
  bindings: any;

  constructor() {
    this.controller = UserItemController;
    this.templateUrl = require('./user-item.component.html');
    this.bindings = {
      user: '<'
    };
  }

}
