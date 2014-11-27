angular.module("app")

.controller('BuyCtrl',
  function($scope, $rootScope, $location, $translate, $modal, TicketSrvc) {

  $scope.data = [];
  TicketSrvc.list().success(function(data) {
    $scope.data = data;
  });

  function doBuy(product, uid) {
    TicketSrvc.buy(product, uid).success(function(data) {
      $rootScope.loggedUser.credit -= product.amount;
      $location.path('/');
    }).error(function(err){
      $scope.error = $translate.instant(err);
    });
  }

  $scope.buy = function(ticket) {
    if(ticket.cat !== 2) {
      doBuy(ticket, $rootScope.loggedUser.id);
    } else {
      var modalInstance = $modal.open({
        templateUrl: 'regid-form.html',
        controller: 'ModalRegistrackaCtrl',
      });

      modalInstance.result.then(function (regid) {
        doBuy(ticket, regid);
      });
    }
  };

})

.controller('ModalRegistrackaCtrl', function ($scope, $modalInstance) {

  $scope.item = '';

  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
