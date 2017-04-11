
//login form controller, validate then redirect to the profile...
angular.module("DeliveryApp").controller('LoginFormController', function ($scope,$window,$location,$mdDialog) {

    $scope.submit = function () {

        //this is not the right to make ajax request.
        // the right approach is to use $http voc for angular, postponed for imrovement
        var request = $.ajax({
            type: 'get',
            url: 'http://34.200.125.97/kc/public/delivery/login',
            dataType: 'text',
            data: {
                email: $scope.user.email,
                password: $scope.user.password
            }
        });
        request.done(function (response) {
            if (response !=0) {
                //hide login error
                $('#loginerror').hide();
                //populate session data with user profile
                $scope.session.populateSession(JSON.parse(response));

                  $location.path("request_english");
                 if(!$scope.$$phase) $scope.$apply();

            } else if (response == 0) {
                console.log("incorrect email or password!!");
                       //show login error
                    $('#loginerror').show();
            }
        }); // Ajax Call*/
        request.fail(function (jqXHR, textStatus) {
            console.log(jqXHR)
        });

    }



    $scope.forgotPassword = function (ev) {

        console.log("do stuff here the idiot who forgot password");

        var confirm = $mdDialog.prompt()
            .title('Please enter your email and password will be sent to you.')
            .textContent('')
            .placeholder('Email')
            .ariaLabel('Email')
            .initialValue('')
            .targetEvent(ev)
            .ok('Send Password').css({"font-size":"x-large","color":"#757575"});


        $mdDialog.show(confirm).then(function(result) {

            var request = $.ajax({
                type: 'get',
                url: 'http://34.200.125.97/kc/public/delivery/forgotpassword',
                dataType: 'text',
                data: {
                    email: result
                }
            });
            request.done(function (response) {
                if (response ==1) {
                    //email sent

                } else if (response == 0) {
                 //wrong email or some other error...
                }
            }); // Ajax Call*/
            request.fail(function (jqXHR, textStatus) {
                //somwthing wrong with the call....
                console.log(jqXHR)
            });


        });

    }




})