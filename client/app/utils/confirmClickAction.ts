export const confirmClickAction = () => {
  return {
    link: (scope, element, attr) => {
      let msg = attr.ngConfirmClick || 'Are you sure?';
      let clickAction = attr.confirmedClick;
      element.bind('click', (event) => {
        if (window.confirm(msg)) {
          scope.$eval(clickAction);
        }
      });
    }
  };
};
