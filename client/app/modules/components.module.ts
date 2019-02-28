import { module } from 'angular';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../components/login/login.component';
import { ForgotPasswordPageComponent } from '../components/forgot-password-page/forgot-password-page.component';
import { UserInfoTabComponent } from '../components/user-info-tab/user-info-tab.component';
import { MainHeaderComponent } from '../components/main-header/main-header.component';
import { EditorInfoUserTabComponent } from '../components/editor-info-user-tab/editor-info-user-tab.component';
import { UsersSearchComponent } from '../components/userListBundle/users-search/users-search.component';
import { UserItemComponent } from '../components/userListBundle/user-item/user-item.component';
import { UserListToggleComponent } from '../components/userListBundle/user-list-toogle/user-list-toggle.component';
import { UserListToggleButtonComponent } from '../components/userListBundle/user-list-toogle-button/user-list-toggle-button.component';
import { UserListComponent } from '../components/userListBundle/user-list/user-list.component';
import { UserListViewComponent } from '../components/userListBundle/user-list-view/user-list-view.component';
import { EditUserComponent } from '../components/AdminBundle/edit-user/edit-user.component';
import { EditUsersComponent } from '../components/AdminBundle/edit-users/edit-users.component';

export const componentsModule = module('componentModule', [])
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
  .component(EditUsersComponent.NAME, new EditUsersComponent());
