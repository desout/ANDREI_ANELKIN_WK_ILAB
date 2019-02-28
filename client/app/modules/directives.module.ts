import { module } from 'angular';
import { UserNameValidator } from '../validators/user-name.validator';
import { AgeValidatorType, AgeValidatorValue } from '../validators/age.validator';
import { DateValidator } from '../validators/date.validator';
import { confirmClickAction } from '../utils/confirmClickAction';
import { routeLinkActive } from '../utils/routeLinkActive';

export const directivesModule = module('directivesModule', [])
  .directive('suitName', UserNameValidator)
  .directive('ageType', AgeValidatorType)
  .directive('ageValue', AgeValidatorValue)
  .directive('dateValue', DateValidator)
  .directive('ngConfirmClick', confirmClickAction)
  .directive('routeLinkActive', routeLinkActive);
