import { IHttpResponse } from 'angular';
import { LoggingService } from '../utils/loggingService';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthResponseType {
  success: boolean;
  message: string;
  token?: string;
  object?: string;
}

export interface UserLogin {
  name: string;
  password: string;
}

export class AuthService {
  static $inject = ['$http', 'loggingService', '$state'];
  static NAME: string = 'authService';
  private rootUrl = 'http://localhost:8000';

  constructor(private http: ng.IHttpService, private loggingService: LoggingService, private state: ng.ui.IStateService) {
  }

  login(user: UserLogin): Observable<AuthResponseType> {
    return from(this.http.post<AuthResponseType>(`${this.rootUrl}/account/login`, user)
      .then(((res: IHttpResponse<AuthResponseType>) => res.data))).pipe(tap((response: AuthResponseType) => {
      this.loggingService.log(AuthService.NAME, `login user: ${response.success ? 'success' : 'not success'}`)
    }));
  }

  logout = (): Promise<void> => this.http.post(`${this.rootUrl}/account/logout`, {})
    .then(() => {
      this.loggingService.log(AuthService.NAME, `logout user`);
      this.state.go('auth.login')
    });

}
