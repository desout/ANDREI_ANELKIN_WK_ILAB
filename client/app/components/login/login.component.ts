import { AuthResponseType, AuthService, UserLogin } from '../../services/auth.service';
import { UserService } from '../../services/user.services';
import { equals } from 'angular';
import { tap } from 'rxjs/operators';

class LoginController implements ng.IController {
  static $inject = ['$rootScope', '$state', 'userService', 'authService'];

  user: UserLogin = {name: '', password: ''};

  constructor(public $scope: ng.IScope,
              public $state: ng.ui.IStateService,
              protected userService: UserService,
              private authService: AuthService) {
  }

  onSubmit(form: HTMLFormElement): void {
    this.authService.login({name: this.user.name, password: this.user.password} as UserLogin).pipe(tap(response => {
      if (!(response as AuthResponseType).success) {
        form.password.$setValidity('badPassword', false);
        if (!this.$scope.$$phase) {
          this.$scope.$digest();
        }
      } else {
        this.$state.go('app.infoTab');
      }
    }), tap((res: AuthResponseType) => this.userService.updateLocalCurrentUser(this.userService.getLocalUser(JSON.parse(res.object))))).subscribe();
  }

  onClickLogout(): void {
    this.authService.logout();
  }

  onChange(element: HTMLFormElement): void {
    element.$setValidity('badPassword', true);
    if (!this.$scope.$$phase) {
      this.$scope.$digest();
    }
  }

  isEmptyObject = (obj): boolean => equals({}, obj);
}

export class LoginComponent implements ng.IComponentOptions {
  static NAME: string = 'login';
  controller: any;
  templateUrl: any;
  data: any;

  constructor() {
    this.controller = LoginController;
    this.templateUrl = require('./login.component.html');
    this.data = {
      'noLogin': true
    };
  }
}
