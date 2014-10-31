
var app = angular.module("app");


var _adaptUser = function(user) {
  if (! ('name' in user)) {
    user.name = user.first_name + ' ' + user.last_name || user.username;
  }
  return user;
};


app.factory('AuthService', function($http, $window, $rootScope, $localStorage) {

  var _setUser = function(user) {
    $localStorage.currentUser = _adaptUser(user);
    $localStorage.token = user.token;
  };

  // these routes map to stubbed API endpoints in config/server.js
  return {
    login: function(credentials, done) {
      $http.post('/auth/login', credentials)
        .success(function(user){
          _setUser(user);
          return done(null, user);
        })
        .error(function(err){
          return done(err);
        });
    },

    setUser: _setUser,

    logout: function(done) {
      delete $localStorage.currentUser;
      delete $localStorage.token;
      return done();
    },

    socialLogin: function(provider, cb) {
      $window.location.href = '/auth/' + provider + '/';
    },

    getCurrentUser: function() {
      return $localStorage.currentUser || null;
    },

    isLoggedIn: function() {
      return $localStorage.hasOwnProperty('currentUser');
    },

    register: function(user, cb) {
      $http.post('/auth/register', user)
        .success(function(user) {
          return cb(null, user);
        })
        .error(function(err) {
          return cb(err);
        });
    }
  };
});
