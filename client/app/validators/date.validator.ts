import * as moment from 'moment';
import { DATE_FORMATS } from '../shared/configuration';

export const DateValidator = ($q, $timeout) => {
  return {
    require: 'ngModel',
    link: (scope, elm, attrs, ctrl) =>
      ctrl.$validators.dateValue = (modelValue: string): boolean => DateValidatorFn($q, $timeout, modelValue, ctrl)
  };
};

const DateValidatorFn = ($q, $timeout, modelValue, ctrl) => {
  if (ctrl.$isEmpty(modelValue)) {
    return true;
  }
  return moment(modelValue, DATE_FORMATS, true).isValid();
};
