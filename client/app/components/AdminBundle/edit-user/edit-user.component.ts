import { User } from '../../../models/User';
import { cloneDeep } from 'lodash';
import { UserDropDownService } from '../../../services/user-dropdown.service';
import { UserService } from '../../../services/user.services';
import { equals } from 'angular';
import { AdminFactory } from '../../../factories/AdminFactory';
import './edit-user.component.scss';

export class EditUserController implements ng.IController {
  static $inject = ['userDropDownService', 'userService', 'adminFactory'];
  user: User = {
    name: '',
    password: '',
    dateOfBirth: '',
    dateOfFirstLogin: '',
    dateNextNotification: '',
    information: '',
    role: ''
  };

  constructor(private dropDownService: UserDropDownService, private userService: UserService, private adminFactory: AdminFactory) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (!this.dropDownService.selectedUser) {
      this.user.role = 'USER';
      this.userService.addUser(this.user);
    } else {
      this.userService.updateUser(this.user);
    }
    this.dropDownService.getUsers().subscribe();
    this.dropDownService.selectedUser = null;
    this.adminFactory.showEdit = false;
  }

  onClickDelete(form: HTMLFormElement): void {
    if (this.dropDownService.selectedUser.role !== 'ADMIN') {
      this.userService.deleteUser(this.dropDownService.selectedUser.id);
      this.dropDownService.getUsers().subscribe();
      this.resetForm(form);
      this.dropDownService.selectedUserHandle.next(-1);
    }
  }

  setUser(): void {
    if (this.dropDownService.selectedUser) {
      this.user = cloneDeep(this.dropDownService.selectedUser);
    }
  }

  onClickClose(): void {
    this.adminFactory.showEdit = false;
  }

  resetForm(form: HTMLFormElement): void {
    form.reset();
  }

  isEmptyObject = (obj): boolean => equals({}, obj);
}

export class EditUserComponent implements ng.IComponentOptions {
  static NAME: string = 'editUserComponent';
  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = EditUserController;
    this.templateUrl = require('./edit-user.component.html');
  }
}
