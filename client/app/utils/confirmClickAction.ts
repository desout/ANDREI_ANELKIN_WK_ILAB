export function confirmClickAction() {
  return {
    link: function (scope, element, attr) {
      let msg = attr.ngConfirmClick || "Are you sure?";
      let clickAction = attr.confirmedClick;
      element.bind('click', function (event) {
        if (window.confirm(msg)) {
          scope.$eval(clickAction)
        }
      });
    }
  };

}