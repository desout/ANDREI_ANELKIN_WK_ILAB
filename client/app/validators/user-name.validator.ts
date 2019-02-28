export const UserNameValidator = ($q, $timeout) => {
  return {
    require: 'ngModel',
    link: (scope, elm, attrs, ctrl) =>
      ctrl.$asyncValidators.suitName = (modelValue: string): Promise<boolean> => isNameTaken($q, $timeout, modelValue, ctrl)
  };
};

const isNameTaken = ($q, $timeout, modelValue, ctrl): Promise<boolean> => {
  if (ctrl.$isEmpty(modelValue)) {
    return $q.resolve();
  }

  const def = $q.defer();
  const splittedName = modelValue.split(' ');
  const isValid: boolean = isValidName(splittedName);
  $timeout(() => isValid ? def.resolve() : def.reject(), 2000);

  return def.promise;
};

const checkName = (name: string): boolean => {
  const splittedName: string[] = name.split('');
  for (const char of splittedName) {
    if (!isLetter(char)) {
      return false;
    }
  }
  const firstCharacter = name.charAt(0);
  const upperCharacter = firstCharacter.toUpperCase();
  return firstCharacter === upperCharacter;
};
const isValidName = (splittedName: Array<string>): boolean => {
  if (splittedName.length <= 2) {
    for (const part of splittedName) {
      const isValidPart = checkName(part);
      if (!isValidPart) {
        return false;
      }
    }
    return true;
  }
  return false;
};
const isLetter = (c): boolean => c.toLowerCase() !== c.toUpperCase();
