

angular.module("app")

.config(['$translateProvider', function ($translateProvider) {

  $translateProvider.preferredLanguage('cs');
  moment.locale('cs');

}]);
