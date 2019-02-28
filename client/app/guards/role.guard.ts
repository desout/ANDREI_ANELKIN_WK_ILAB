import { IScope } from 'angularjs';
import { UserService } from '../services/user.services';
import { LoggingService } from '../utils/loggingService';

export class RoleGuard {
  static $inject = ['$rootScope', '$state', '$http', 'userService', 'loggingService'];
  static NAME: string = 'roleGuard';

  constructor(private scope: IScope, private state: ng.ui.IStateService, private http: ng.IHttpService, private userService: UserService, private loggingService: LoggingService) {
  }

  public canActivate(): void {
    this.loggingService.log(RoleGuard.NAME, 'checking for admin role');
    if (this.userService && this.userService.currentUser.role !== 'ADMIN') {
      this.state.go('app.infoTab');
    }
  }
}
