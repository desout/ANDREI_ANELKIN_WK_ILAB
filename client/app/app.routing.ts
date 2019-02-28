import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { UserInfoTabComponent } from './components/user-info-tab/user-info-tab.component';
import { EditorInfoUserTabComponent } from './components/editor-info-user-tab/editor-info-user-tab.component';
import { EditUsersComponent } from './components/AdminBundle/edit-users/edit-users.component';

export const routing =
  ['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $stateProvider
      .state({
        name: 'app',
        url: '/',
        redirectTo: 'auth.login'
      })
      .state({
        name: 'auth',
        url: '/',
        redirectTo: 'auth.login'
      })
      .state({
        name: 'auth.login',
        url: 'account/login',
        component: LoginComponent.NAME
      })
      .state({
        name: 'auth.forgotPassword',
        url: 'account/forgotPassword',
        component: ForgotPasswordPageComponent.NAME,
      })
      .state({
        name: 'app.infoTab',
        url: 'infoTab',
        component: UserInfoTabComponent.NAME
      })
      .state({
        name: 'app.editTab',
        url: 'editTab',
        component: EditorInfoUserTabComponent.NAME
      })
      .state({
        name: 'app.adminTab',
        url: 'adminTab',
        component: EditUsersComponent.NAME
      });

    $urlRouterProvider.otherwise('/account/login');
  }];
