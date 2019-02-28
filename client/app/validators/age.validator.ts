export const AgeValidatorType = ($q, $timeout) => {
  return {
    require: 'ngModel',
    link: (scope, elm, attrs, ctrl) =>
      ctrl.$validators.ageValue = (modelValue: string): boolean => AgeValidatorTypeFn($q, $timeout, modelValue, ctrl)
  };
};
const AgeValidatorTypeFn = ($q, $timeout, modelValue, ctrl) => {
  if (ctrl.$isEmpty(modelValue)) {
    return true;
  }

  const age: number = Number(modelValue);

  return isInt(age);
};
export const AgeValidatorValue = ($q, $timeout) => {
  return {
    require: 'ngModel',
    link: (scope, elm, attrs, ctrl) =>
      ctrl.$validators.ageType = (modelValue: string): boolean => AgeValidatorValueFn($q, $timeout, modelValue, ctrl)
  };
};
const AgeValidatorValueFn = ($q, $timeout, modelValue, ctrl) => {
  if (ctrl.$isEmpty(modelValue)) {
    return true;
  }
  const age: number = Number(modelValue);

  return !isInt(age) || !(age < 18 || age > 65);
};

function isInt(age: number): boolean {
  return age % 1 === 0;
}
