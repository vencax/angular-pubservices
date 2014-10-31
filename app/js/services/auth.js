
var app = angular.module("app");


var _adaptUser = function(user) {
  if (! ('name' in user)) {
    user.name = user.first_name + ' ' + user.last_name || user.username;
  }
  return user;
};


app.factory('AuthService', function($http, $window, SessionService) {

  var _setUser = function(user) {
    SessionService.currentUser = _adaptUser(user);
    $window.sessionStorage.token = user.token;
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
      SessionService.currentUser = '';
      return done();
    },

    socialLogin: function(provider, cb) {
      $window.location.href = '/auth/' + provider + '/';
    },

    isLoggedIn: function() {
      return SessionService.currentUser !== null;
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


app.factory('SessionService', function() {
  return {
    currentUser: null
  };
});