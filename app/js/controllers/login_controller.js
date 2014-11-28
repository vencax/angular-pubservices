angular.module("app")

.controller('LoginController', function($scope, $rootScope, $location, AuthService, TicketSrvc) {

  $scope.credentials = { username: "", password: "" };

  var _authServiceHandler = function(err, user) {
    if (err) {
      $scope.error = err;
    } else {
      $rootScope.onLoggedIn(user);
      $location.path("/");
    }
  };

  $scope.login = function() {
    AuthService.login($scope.credentials, _authServiceHandler);
  };

  $scope.socialLogin = function(provider) {
    AuthService.socialLogin(provider, _authServiceHandler);
  };

  $scope.register = function() {
    $location.path("/register");
  };

})

.controller('SocialLoginCallbackCtrl', function($scope, $rootScope, $location, AuthService, TicketSrvc) {

  AuthService.getUserAfterSocialLogin(function(err, user) {
    if(err) {
      return alert(err);
    }
    $rootScope.onLoggedIn(user);
    $location.path("/");
  });

});
