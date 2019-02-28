import { UserService } from '../../services/user.services';
import { AuthService } from '../../services/auth.service';
import './main-header.component.scss';

class MainHeaderController implements ng.IController {
  static $inject = ['userService', 'authService', '$state', '$translate'];
  public currentLang: string;

  constructor(public userService: UserService, public authService: AuthService, public $state: ng.ui.IStateService, public $translate) {
    this.currentLang = $translate.use();
  }

  onClickLogout = (): Promise<void> => this.authService.logout().then((res) => {
    this.userService.updateLocalCurrentUser(null);
    this.$state.go('app.login');
  })
}

export class MainHeaderComponent implements ng.IComponentOptions {
  static NAME: string = 'headerComponent';
  controller: any;
  templateUrl: any;
  bindings: any;

  constructor() {
    this.controller = MainHeaderController;
    this.templateUrl = require('./main-header.component.html');
    this.bindings = {
      title: '<'
    };
  }

}
