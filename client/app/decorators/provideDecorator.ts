import * as moment from 'moment';

export const provideDecorator = ['$provide', function ($provide) {

  $provide.decorator('$log', [
    '$delegate',
    function $logDecorator($delegate) {

      const originalFn = $delegate.debug;
      $delegate.debug = function decoratedWarn() {
        let args = [].slice.call(arguments);
        let time = moment();
        args = [`${time.format('dd-MMM-YYYY')} ${time.format('HH:MM:SS:MS')} - ${args[0]}: ${args[1]}`];
        originalFn.apply(null, args);
      };

      return $delegate;
    }
  ]);
}];