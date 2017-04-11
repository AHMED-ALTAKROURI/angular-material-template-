//app.js must include the app configuration and main controllers only....

//controllers for each view form or whole page must be inside controllers.js

//to pass arg between pages you have to use angular services.


var app = angular.module('DeliveryApp', ['ngMaterial', 'ngMdIcons', 'ngRoute']);

//init language as 0 for eng and 1 for ara
var language = 0;


angular.module('DeliveryApp').config(function($mdThemingProvider) {

      $mdThemingProvider.theme('default')
     .primaryPalette('grey', {
     'default': '300' // by default use shade 400 from the orange palette for primary intentions
     })
     // default shades
     .accentPalette('orange', {
     'default': '300' // use shade 300 for default, and keep all other shades the same
     })

});



// this is a view router for mg-view for one page where /login_english route or otherwise.......
// you might need to use angular UI router..
angular.module('DeliveryApp').config(function ($routeProvider) {

    $routeProvider
        .when("/login_english", {
            templateUrl: "/kc/app/views/web/DeliveryApp/views/login_en.htm"
        })
        .when("/login_arab", {
            templateUrl: "/kc/app/views/web/DeliveryApp/views/login_ar.htm"
        })
        .when("/register_arabic", {
           /* controller: 'RegistrationFormController',*/
            templateUrl: "/kc/app/views/web/DeliveryApp/views/register_ara.htm"
        })
        .when("/register_english", {
            templateUrl: "/kc/app/views/web/DeliveryApp/views/register_en.htm"
        })
        .when("/request_english",{
            templateUrl:"/kc/app/views/web/DeliveryApp/views/request_en.htm"
        })
        .when("/request_arabic",{
                    templateUrl: "/kc/app/views/web/DeliveryApp/views/request_ar.htm"
        })
        .otherwise({
            templateUrl: "/kc/app/views/web/DeliveryApp/views/login_en.htm"
        });
})


//disable form from submitting by hitting enter button, to avoid getting it confused with <div map></div>
$('#RegistrationForm , #RequestForm , #loginForm').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});



//main/AppCtrl Controller general use functions...
angular.module('DeliveryApp').controller('AppCtrl', function($scope,$window, Session){

   $scope.redirect= function (url) {
       $window.location.href = url;
   }


})


//start user session, we might need to change this invokation to another function..
app.run(function(Session) {});



//this controller is public to all the app pages that is why we create session from it, to make session accesable by all controllers.
app.controller('MainCtrl', function($scope, Session) {
     $scope.session = Session;
});



//session data and functions......
app.factory('Session', function($http) {
    var Session = {
        data: {},
        saveSession: function() { /* save session data to db */
        },

        populateSession: function (userData){ /*populate user session given json object represents user profile.*/

          return Session.data = userData;
        },


        updateSession: function() {

        }
    };
    Session.updateSession();
    return Session;
});




