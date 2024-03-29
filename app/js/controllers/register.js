
function _commonServiceHandler(err, message, $scope) {
  if (err) {
    $scope.error = err;
  } else {
    $scope.error = null;
    $scope.message = message;
  }
}


angular.module("app")

.controller('RegisterCtrl', function($scope, AuthService) {

  $scope.user = { name: "", email: "", passwd: "" };
  $scope.pwdVerif = "";
  $scope.error = $scope.message = null;

  $scope.register = function() {
    AuthService.register($scope.user, function(err, message) {
      _commonServiceHandler(err, message, $scope);
    });
  };

})

.controller('RequestpwdCtrl', function($scope, AuthService) {
  $scope.email = "";
  $scope.error = $scope.message = null;

  $scope.submit = function() {
    AuthService.requestForgottenPwd($scope.email, function(err, message) {
      _commonServiceHandler(err, message, $scope);
    });
  };
})

.controller('ChangepwdCtrl', function($scope, $location, AuthService) {
  $scope.pwd = "";
  $scope.pwdVerif = "";
  $scope.error = $scope.message = null;

  $scope.submit = function() {
    var query = $location.url().split('?')[1];
    AuthService.changePwd($scope.pwd, query, function(err, message) {
      _commonServiceHandler(err, message, $scope);
    });
  };
});
