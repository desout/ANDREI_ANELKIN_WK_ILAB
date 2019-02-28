import { module } from 'angular';
import { UserService } from '../services/user.services';
import { AuthService } from '../services/auth.service';
import { LoggingService } from '../utils/loggingService';
import { UserDropDownService } from '../services/user-dropdown.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

export const servicesModule = module('servicesModule', [])
  .service(UserService.NAME, UserService)
  .service(AuthService.NAME, AuthService)
  .service(LoggingService.NAME, LoggingService)
  .service(UserDropDownService.NAME, UserDropDownService)
  .service(AuthGuard.NAME, AuthGuard)
  .service(RoleGuard.NAME, RoleGuard);
