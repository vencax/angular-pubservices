
angular.module("app")

.factory('AuthService', function($http, $window, $rootScope, SessionService, Conf) {

  // these routes map to stubbed API endpoints in config/server.js
  return {
    login: function(credentials, done) {
      $http.post(Conf.host + '/auth/login', credentials)
        .success(function(uinfo){
          SessionService.setCurrentUser(uinfo.user, uinfo.token);
          return done(null, uinfo.user);
        })
        .error(function(err){
          return done(err);
        });
    },

    logout: function(done) {
      SessionService.logout();
      return done();
    },

    socialLogin: function(provider, cb) {
      $window.location.href = Conf.host + '/auth/' + provider + '/';
    },

    getUserAfterSocialLogin: function(cb) {
      $http.get(Conf.host + '/auth/userinfo')
      .success(function(uinfo) {
        SessionService.setCurrentUser(uinfo.user, uinfo.token);
        return cb(null, uinfo.user);
      })
      .error(function(err) {
        cb(err);
      });
    },

    register: function(user, cb) {
      $http.post(Conf.host + '/auth/register', user)
        .success(function(user) {
          return cb(null, user);
        })
        .error(function(err) {
          return cb(err);
        });
    },

    changePwd: function(pwd, cb) {
      $http.post(Conf.host + '/auth/setpasswd', {'passwd': pwd})
        .success(function(data) {
          return cb(null, data);
        })
        .error(function(err) {
          return cb(err);
        });
    },

    requestForgottenPwd: function(email, cb) {
      $http.post(Conf.host + '/auth/requestforgotten', {'email': email})
        .success(function(data) {
          return cb(null, data);
        })
        .error(function(err) {
          return cb(err);
        });
    }
  };
})

.factory('SessionService', function($localStorage, $location) {

  var _cuKey = $location.host() + $location.port() + 'currentUser';

  return {
    setCurrentUser: function(currentUser, token) {
      currentUser.token = token;
      $localStorage[_cuKey] = currentUser;
    },

    getCurrentUser: function() {
      return $localStorage[_cuKey] || null;
    },

    isLoggedIn: function() {
      return $localStorage.hasOwnProperty(_cuKey);
    },

    logout: function() {
      delete $localStorage[_cuKey];
    }
  };

});
