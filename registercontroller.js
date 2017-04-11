
//register form controller, after validation show confirm masg then rediret to login page
angular.module('DeliveryApp').controller('RegistrationFormController' , function ($scope,$mdToast,$http,$window,$location) {



    var map ; //Will contain map object.
    var marker = false; ////Has the user plotted their location marker?
    var address ;
    var geocoder;

        geocoder = new google.maps.Geocoder;

           //The center location of our map.
           var centerOfMap = new google.maps.LatLng(21.551343, 39.174972);

           //Map options.
           var options = {
               center: centerOfMap, //Set center.
               zoom: 10, //The zoom value.
               disableDefaultUI: false

           };
           map = new google.maps.Map(document.getElementById('map_canvas'), options);



        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


    map.addListener("mousenove" , function () {
        console.log("mouse moved");
        google.maps.event.trigger(map, 'resize');

    })

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
                 google.maps.event.trigger(map, 'resize');

        });


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            clearHomeMarker();

            marker = new google.maps.Marker({
                position: places[0].geometry.location,
                map: map,
                draggable: true //make it draggable
            });

            map.setCenter(places[0].geometry.location);
            map.setZoom(15);
            //  console.log(places[0].geometry.location);
            //clear marker1 and push the new one.

        });

        //Listen for any clicks on the map.
        google.maps.event.addListener(map, 'click', function (event) {
            //Get the location that the user clicked.
            var clickedLocation = event.latLng;
            //If the marker hasn't been added.
            if (marker === false) {
                //Create the marker.
                marker = new google.maps.Marker({
                    position: clickedLocation,
                    map: map,
                    draggable: true //make it draggable
                });
                //Listen for drag events!

                assign();

                google.maps.event.addListener(marker, 'dragend', function (event) {
                    assign();
                });
            } else {
                //Marker has already been added, so just change its location.
                marker.setPosition(clickedLocation);

                assign();


            }
            //Get the marker's location.
            // markerLocation1();
        });


    var useragent = navigator.userAgent;
    var locationmap = document.getElementById("map_canvas");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {

        locationmap.style.width = '95%';

        /* pickupMap.style.height = '100%';*/
        /*dropoffmap.style.height = '100%'; */

    } else {
        /* pickupMap.style.width = '600px';
         pickupMap.style.height = '800px';

         dropoffmap.style.height = '600px';
         dropoffmap.style.height = '800px';*/
    }

    
        function assign() {

            console.log("Company Location"+marker.getPosition());
            geocodePosition(new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng()),
                //anonymous function
                function (location) {
                    address = location;
                    console.log(address);
                }
            );

        }




//returns will assighn address to its parm "location' or respones[0].formatted_address;
    function geocodePosition(pos, assign) {

        geocoder.geocode({latLng: pos}, function (responses) {

            if (responses && responses.length > 0) {
                // call anonymous function with parm  :returns(location) location = respones[0].formatted_address;
                assign(responses[0].formatted_address);

            } else {
                assign("none");
            }
        });

    }




    function clearHomeMarker() {

        try {
            console.log("Company Location"+marker.getPosition());
            geocodePosition(new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng()),

                //anonymous function
                function (location) {
                    address = location;
                    console.log(address);
                }
            );
            //  marker2.setMap(null);
        } catch (err) {
            console.log("Markers are not initialized ");
        }


        try {
            marker.setMap(null);
            marker = false ;
        } catch (err) {
            console.log("Marker is not initialized ");
        }

    }



    /*
     Submit Logic: ........
     Map Logic: show error msg and disable submit button, if marker clicked on enable the button
     */
    $scope.submit = function() {
        //if mraker is intialized:
        if (marker) {
            console.log(marker.getPosition().lat());
            console.log(marker.getPosition().lng());
            //hide error
            $('#maphint').hide();
            createCompanyAccount();

            //if marker is false the user has not choosen a location....
        } else {
            //show map hint msg
            $('#maphint').show();
        }

    };

    function createCompanyAccount() {

        //this is not the right to make ajax request... the right approach is to use $http voc for angular, postponed for imrovement
        var request = $.ajax({
            type: 'POST',
            url: 'http://34.200.125.97/kc/public/delivery/signup',
            dataType: 'text',
            data: {
                name: $scope.company.name,
                email: $scope.company.email,
                password: $scope.company.password,
                phone: $scope.company.mobile,
                product_type: $scope.company.productsype,
                city: $scope.company.city,
                latitude: marker.getPosition().lat(),
                longitude: marker.getPosition().lng(),
                address: address
            }
        });
        request.done(function (response) {
            console.log(response);

            if (response == 1) {
                  console.log("account created");
                showSuccessToast();

                //wait for the toast then redirect to login page;)
                setTimeout(function () {

                    $location.path("/login_english");



                }, 5000);

            } else if (response == 0) {
                //ask the user to change the email!!! change ng-message dynamiaclly
                console.log("email already exist");
            }
        }); // Ajax Call*/
        request.fail(function (jqXHR, textStatus) {
            console.log("request fail for the reason" + textStatus)
        });
    }

    function showSuccessToast() {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Account Created Check Your Email!!')
                .position("top")
                .hideDelay(4000)

        );
    }





    /*
     var url = 'http://34.200.125.97/kc/public/delivery/signup';
     config = 'contenttype';
     var data ={
     name: $scope.company.name,
     email: $scope.company.email,
     password: $scope.company.password,
     phone: $scope.company.mobile,
     product_type: $scope.company.productsype,
     city: $scope.company.city,
     latitude: marker.getPosition().lat(),
     longitude: marker.getPosition().lng(),
     address: address
     }
     $http.post(url, data, config).then(function (response) {
     //on success.
     console.log(response.data);


     showSuccessToast();
     if(response.data=="done"){

     }else {
     console.log('something wrong');
     }*!/

     }, function (response) {
     //on failure
     console.log(response.data.error);
     console.log("failure call");
     });

     $http({
     url: url,
     method: "POST",
     dataType: "text",
     data: data
     }).success(function(data, status, headers, config) {
     console.log(data);
     }).error(function(data, status, headers, config) {
     console.log(status);
     });
     */




})