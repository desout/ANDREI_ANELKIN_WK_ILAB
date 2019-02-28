import { User } from '../../models/User';
import { UserService } from '../../services/user.services';
import { equals } from 'angular';
import { IScope } from 'angularjs';
import { cloneDeep } from 'lodash';
import { tap } from 'rxjs/operators';

class EditorInfoUserTabController implements ng.IController {
  static $inject = ['userService', '$state', '$rootScope'];
  user: User = {
    name: '',
    dateOfBirth: '',
    dateOfFirstLogin: '',
    dateNextNotification: '',
    information: '',
    role: ''
  };

  onSubmit(form: HTMLFormElement): void {
    if (this.user.name !== this.userService.currentUser.name) {
      this.userService.checkUser(this.user.name).pipe(tap((response: boolean) => {
        if (response) {
          this.$scope.$apply(form.userName.$setValidity('isBadName', false));
        } else {
          this.userService.updateUser(this.user).subscribe((user) => this.userService.updateLocalCurrentUser(user));

        }
      })).subscribe();
    } else {
      this.userService.updateUser(this.user).subscribe((user) => this.userService.updateLocalCurrentUser(user));

    }
  }

  constructor(public userService: UserService, public $state: ng.ui.IStateService, private $scope: IScope) {
  }

  setUser(): void {
    this.user = cloneDeep(this.userService.currentUser);
  }

  onChange(element: HTMLFormElement): void {
    element.$setValidity('isBadName', true);
  }

  isEmptyObject = (obj): boolean => equals({}, obj);

}

export class EditorInfoUserTabComponent implements ng.IComponentOptions {
  static NAME: string = 'userEditTab';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = EditorInfoUserTabController;
    this.templateUrl = require('./editor-info-user-tab.component.html');
  }

}
