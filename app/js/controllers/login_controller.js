angular.module("app")

.controller('LoginController', function($scope, $rootScope, $location, AuthService, TicketSrvc) {

  $scope.credentials = { username: "", password: "" };

  var _onLoggedIn = function(user) {
    $location.path("/");
    $rootScope.loggedUser = user;
    TicketSrvc.credit(user).success(function(credit){
      user.credit = parseInt(credit, 10);
    });
  };

  var _authServiceHandler = function(err, user) {
    if (err) {
      $scope.error = err;
    } else {
      _onLoggedIn(user);
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
    $location.path("/");
    $rootScope.loggedUser = user;
    TicketSrvc.credit(user).success(function(credit){
      user.credit = parseInt(credit, 10);
    });
  });

});
