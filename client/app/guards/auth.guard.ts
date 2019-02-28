import { IScope } from 'angularjs';
import { AuthResponseType } from '../services/auth.service';
import { IHttpResponse } from 'angular';
import { LoggingService } from '../utils/loggingService';

export class AuthGuard {
  static $inject = ['$rootScope', '$state', '$http', 'loggingService'];
  static NAME: string = 'authGuard';
  private rootUrl = 'http:///localhost:8000/account';

  constructor(private scope: IScope, private state: ng.ui.IStateService, private http: ng.IHttpService, private loggingService: LoggingService) {
  }

  public canActivate = (): Promise<void> => {
    this.loggingService.log(AuthGuard.NAME, 'checking authorization');
    return this.http.get<AuthResponseType>(this.rootUrl + '/auth').then((res: IHttpResponse<AuthResponseType>) => {
      const response: AuthResponseType = res.data;
      if (!response.success) {
        this.state.go('auth.login');
      }
    })
  }
}
