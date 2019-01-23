/**
 *
 * @ngdoc module
 * @name components.auth
 *
 * @requires ui.router
 * @requires firebase
 *
 * @description
 *
 * This is the auth module. It includes our auth components
 *
 **/
angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function ($firebaseRefProvider) {

    var config = {
      apiKey: "AIzaSyBS0PJDxHy3lDt2eW0ZCUJN3Z18qvxVxP0",
      authDomain: "contact-manager-a9454.firebaseapp.com",
      databaseURL: "https://contact-manager-a9454.firebaseio.com",
      projectId: "contact-manager-a9454",
      storageBucket: "contact-manager-a9454.appspot.com",
      messagingSenderId: "573559064157"
    };

    $firebaseRefProvider
      .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts'
      });

    firebase.initializeApp(config);
  })
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });
