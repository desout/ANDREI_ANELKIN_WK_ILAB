import { module } from 'angular';
import { UserListFactory } from '../factories/UserListFactory';
import { AdminFactory } from '../factories/AdminFactory';
import { requestLogging } from '../utils/requestLogging';

export const factoriesModule = module('factoriesModule', [])
  .factory('userListFactory', UserListFactory)
  .factory('adminFactory', AdminFactory)
  .factory('requestLogger', ['loggingService', requestLogging]);
