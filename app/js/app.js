var app = angular.module("app", [
  "ngResource", "ngRoute", "ui.bootstrap", "ngStorage",
  "pascalprecht.translate"
]);

app.run(function($rootScope, $location, SessionService, AuthService, TicketSrvc) {

  moment.locale(navigator.language);

  $rootScope.logout = function() {
    return AuthService.logout(function() {
      $rootScope.loggedUser = '';
      return $location.path("/login");
    });
  };

  $rootScope.onLoggedIn = function(user) {
    $rootScope.loggedUser = user;
    TicketSrvc.credit(user).success(function(credit){
      user.credit = parseInt(credit, 10);
    });
  };

  if(SessionService.getCurrentUser()) {
    $rootScope.onLoggedIn(SessionService.getCurrentUser());
  }

  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };
});
