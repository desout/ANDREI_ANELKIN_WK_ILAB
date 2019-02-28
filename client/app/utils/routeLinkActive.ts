export const routeLinkActive = ($location) => {

  const link = (scope, element, attrs) => {
    scope.$watch(() => {
        return $location.path();
      },
      (path) => {
        var url = element.find('a').attr('href');
        if (url) {
          url = url.substring(1);
        }

        if (path === url) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }

      });
  };

  return {
    restrict: 'A',
    link: link
  };
};
