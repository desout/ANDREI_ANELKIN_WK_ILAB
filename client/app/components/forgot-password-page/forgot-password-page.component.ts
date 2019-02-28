import { UpdatePasswordUser } from '../../models/UpdatePasswordUser';
import { UserService } from '../../services/user.services';
import { equals } from 'angular';
import { IScope } from 'angularjs';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

class ForgotPasswordPageController implements ng.IController {
  static $inject = ['userService', 'authService', '$state', '$rootScope'];
  user: UpdatePasswordUser = {name: '', oldPassword: '', newPassword: ''};

  constructor(public userService: UserService, private authService: AuthService, public $state: ng.ui.IStateService, protected $scope: IScope) {
  }

  onSubmit(form: HTMLFormElement): void {
    this.userService.checkUser(this.user.name).pipe(tap((response: boolean) => {
      if (!response) {
        form.userName.$setValidity('isBadName', false);
        if (!this.$scope.$$phase) {
          this.$scope.$digest();
        }
      } else {
        this.userService.updatePassword({
          name: this.user.name,
          oldPassword: this.user.oldPassword,
          newPassword: this.user.newPassword
        }).pipe(tap(response => {
          if (!response) {
            form.userName.$setValidity('badPassword', false);
            if (!this.$scope.$$phase) {
              this.$scope.$digest();
            }
          } else {
            this.$state.go('app.infoTab');
          }
        })).subscribe();
      }
    })).subscribe();
  }

  onClickLogout(): void {
    this.authService.logout().then((res) => {
      this.userService.updateLocalCurrentUser(null);
    });
  }

  onChange(element: HTMLFormElement): void {
    element.$setValidity('isBadName', true);
    element.$setValidity('badPassword', true);
    if (!this.$scope.$$phase) {
      this.$scope.$digest();
    }

  }

  isEmptyObject = (obj): boolean => equals({}, obj);

}

export class ForgotPasswordPageComponent implements ng.IComponentOptions {
  static NAME: string = 'forgotPassword';
  controller: any;
  templateUrl: any;
  data: any;

  constructor() {
    this.controller = ForgotPasswordPageController;
    this.templateUrl = require('./forgot-password-page.component.html');
    this.data = {
      'noLogin': true
    };
  }

}
