import { bootstrap, element, module } from 'angular';
import '@uirouter/angularjs';
import 'angular1-async-filter';
import 'angular-translate';
import { AppComponent } from './app.component';
import { UserService } from './services/user.services';
import './app.scss';
import {feedback} from './feedbackModule';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { UserInfoTabComponent } from './components/user-info-tab/user-info-tab.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { routing } from './app.routing';
import { AgeValidatorType, AgeValidatorValue } from './validators/age.validator';
import { EditorInfoUserTabComponent } from './components/editor-info-user-tab/editor-info-user-tab.component';
import { DateValidator } from './validators/date.validator';
import { LoggingService } from './utils/loggingService';
import { UserDropDownService } from './services/user-dropdown.service';
import { UsersSearchComponent } from './components/userListBundle/users-search/users-search.component';
import { UserItemComponent } from './components/userListBundle/user-item/user-item.component';
import { UserListToggleComponent } from './components/userListBundle/user-list-toogle/user-list-toggle.component';
import { UserListToggleButtonComponent } from './components/userListBundle/user-list-toogle-button/user-list-toggle-button.component';
import { UserListComponent } from './components/userListBundle/user-list/user-list.component';
import { UserListViewComponent } from './components/userListBundle/user-list-view/user-list-view.component';
import { EditUserComponent } from './components/AdminBundle/edit-user/edit-user.component';
import { EditUsersComponent } from './components/AdminBundle/edit-users/edit-users.component';
import { UserListFactory } from './factories/UserListFactory';
import { AdminFactory } from './factories/AdminFactory';
import { confirmClickAction } from './utils/confirmClickAction';
import { routeLinkActive } from './utils/routeLinkActive';
import { UserNameValidator } from './validators/user-name.validator';
import { requestLogging } from './utils/requestLogging';
import { provideDecorator } from './provideDecorator';

export const app = module('app', [
  'ui.router',
  'asyncFilter',
  'pascalprecht.translate',
  feedback.name
])
  .config(routing)
  .component(AppComponent.NAME, new AppComponent())
  .component(LoginComponent.NAME, new LoginComponent())
  .component(ForgotPasswordPageComponent.NAME, new ForgotPasswordPageComponent())
  .component(UserInfoTabComponent.NAME, new UserInfoTabComponent())
  .component(MainHeaderComponent.NAME, new MainHeaderComponent())
  .component(EditorInfoUserTabComponent.NAME, new EditorInfoUserTabComponent())
  .component(UsersSearchComponent.NAME, new UsersSearchComponent())
  .component(UserItemComponent.NAME, new UserItemComponent())
  .component(UserListToggleComponent.NAME, new UserListToggleComponent())
  .component(UserListToggleButtonComponent.NAME, new UserListToggleButtonComponent())
  .component(UserListComponent.NAME, new UserListComponent())
  .component(UserListViewComponent.NAME, new UserListViewComponent())
  .component(EditUserComponent.NAME, new EditUserComponent())
  .component(EditUsersComponent.NAME, new EditUsersComponent())
  .service(UserService.NAME, UserService)
  .service(AuthService.NAME, AuthService)
  .service(LoggingService.NAME, LoggingService)
  .service(UserDropDownService.NAME, UserDropDownService)
  .service(AuthGuard.NAME, AuthGuard)
  .service(RoleGuard.NAME, RoleGuard)
  .factory('userListFactory', UserListFactory)
  .factory('adminFactory', AdminFactory)
  .directive('suitName', UserNameValidator)
  .directive('ageType', AgeValidatorType)
  .directive('ageValue', AgeValidatorValue)
  .directive('dateValue', DateValidator)
  .directive('ngConfirmClick', confirmClickAction)
  .directive('routeLinkActive', routeLinkActive)
  .factory('requestLogger', ['loggingService', requestLogging])
  .config(['$translateProvider', ($translateProvider) => {
    const enConfig = require('../assets/i18n/en.json');
    $translateProvider.translations('en', enConfig);
    const ruConfig = require('../assets/i18n/ru.json');
    $translateProvider.translations('ru', ruConfig);
    $translateProvider.preferredLanguage('ru');
    $translateProvider.registerAvailableLanguageKeys(['en', 'ru']);
    $translateProvider.useSanitizeValueStrategy('escape');
  }])
  .config(['$httpProvider', ($httpProvider) => {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('requestLogger');
  }])
  .config(provideDecorator)
  .run([
    '$transitions', 'authGuard', 'roleGuard',
    ($transitions, authGuard: AuthGuard, roleGuard: RoleGuard) => {

      $transitions.onStart({to: 'app.**'},
        () => authGuard.canActivate()
      );
      $transitions.onStart({to: 'app.adminTab'},
        () => roleGuard.canActivate()
      );
    }
  ]);
element(document).ready(() => {
  bootstrap(document, ['app']);
});
