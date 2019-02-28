import { ILogService } from 'angularjs';

export class LoggingService {

  static NAME: string = 'loggingService';
  static $inject = ['$log'];

  constructor(private $log: ILogService) {
  }

  public log = (className: string, descr: string) => {
    this.$log.debug(className, descr);
  }
}
