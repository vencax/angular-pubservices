
angular.module("app")

.factory('TicketSrvc', function($http) {
  // these routes map to stubbed API endpoints in config/server.js
  return {
    list: function() {
      return $http.get('/api/tickets');
    },

    buy: function(ticket, id) {
      return $http.post('/api/buy/' + ticket.id, {uid: id});
    },

    isvalid: function(id) {
      return $http.get('/api/valid/' + id);
    },

    validtickets: function() {
      return $http.get('/api/valid');
    },

    credithistory: function() {
      return $http.get('/api/credit/history');
    },

    credit: function(user) {
      return $http.get('/api/credit/current/' + user.id);
    },

    creditincrease: function(info) {
      return $http.post('/api/credit/increase', info);
    }
  };
});

// .factory('TransUID', function() {
//   return {
//     get: function(id, ttype) {
//       rv = 0;
//       strid = id.toString();
//       for(var i=0; i<strid.length; i++) {
//         rv += strid.charCodeAt(i);
//       }
//       return rv * 10 + ttype;
//     }
//   };
// });
