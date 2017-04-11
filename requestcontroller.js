

/*
 1. Get and validate required info
 2. Route to request page summary.
 */
angular.module("DeliveryApp").controller('RequestFormController', function ($scope) {


    console.log($scope.session.data.address);


    var map ; //Will contain map object.
    var map2  ;
    var pickup = false; ////Has the user plotted their location marker?
    var dropoff =false;

    //regex for URL....
    var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var latlngExpression =  '@(.*),(.*),';

    //init
    var regexUrl = new RegExp(urlExpression);
    var regexLatLng = new RegExp(latlngExpression);



        geocoder = new google.maps.Geocoder;

        //The center location of our map.
        var centerOfMap = new google.maps.LatLng(21.551343, 39.174972);


        //Map options.
        var options = {
            center: centerOfMap, //Set center.
            zoom: 10, //The zoom value.
            disableDefaultUI: false

        };

        var options2 = {
            center: centerOfMap,
            zoom: 10,
            disableDefaultUI:false
        }

        //Create the map object.
        map = new google.maps.Map(document.getElementById('map_canvas'), options);
        map2 = new google.maps.Map(document.getElementById('map_canvas2'), options2);

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


        var input2 = document.getElementById('pac-input2');
        var  searchBox2 =  new google.maps.places.SearchBox(input2);
        map2.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);




        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        map.addListener("mousenove" , function () {
            google.maps.event.trigger(map, 'resize');
            console.log("mouse moved");

        });


    map2.addListener("mousenove" , function () {
        google.maps.event.trigger(map, 'resize');
        console.log("mouse moved");

    })


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            clearHomeMarker();

            pickup = new google.maps.Marker({
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
        google.maps.event.addListener(map, 'click', function(event) {
            //Get the location that the user clicked.
            var clickedLocation = event.latLng;
            //If the marker hasn't been added.
            if(pickup === false){
                //Create the marker.
                pickup = new google.maps.Marker({
                    position: clickedLocation,
                    map: map,
                    draggable: true //make it draggable
                });
                //Listen for drag events!
                google.maps.event.addListener(pickup, 'dragend', function(event){
                    // markerLocation1();
                });
            } else{
                //Marker has already been added, so just change its location.
                pickup.setPosition(clickedLocation);
                console.log("Company Location"+pickup.getPosition());
            }

        });


// Bias the SearchBox results towards current map's viewport.
        map2.addListener('bounds_changed', function() {
            searchBox2.setBounds(map2.getBounds());
        });






    //check if valide return pairs otherwise return latLng
    function extractlatLng(URL) {
         if(URL.match(regexLatLng)){
             return URL.match(regexLatLng);
         }else {
             return 0;
         }
    }

    function isURL(str) {
        if(str.match(regexUrl)){
            return true;
        }
        else{
            return false;
        }
    }



// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
        searchBox2.addListener('places_changed', function() {

            if(isURL($('#pac-input2').val())) {
               var latLng = extractlatLng($('#pac-input2').val());
                 if(latLng!=0){
                     clearHomeMarker2();
                     dropoff = new google.maps.Marker({
                         position: {lat: Number(latLng[1]), lng: Number(latLng[2])},
                         map: map2,
                         draggable: true //make it draggable
                     });

                     map2.setCenter({lat: Number(latLng[1]), lng: Number(latLng[2])});
                     map2.setZoom(15);

                     return ;
               }
            }


            var places = searchBox2.getPlaces();

            if (places.length == 0) {
                return;
            }
            clearHomeMarker2();

            dropoff = new google.maps.Marker({
                position: places[0].geometry.location,
                map: map2,
                draggable: true //make it draggable
            });

            map2.setCenter(places[0].geometry.location);
            map2.setZoom(15);
            //  console.log(places[0].geometry.location);
            //clear marker1 and push the new one.

        });

//Listen for any clicks on the map.
        google.maps.event.addListener(map2, 'click', function(event) {
            //Get the location that the user clicked.
            var clickedLocation = event.latLng;
            //If the marker hasn't been added.
            if(dropoff === false){
                //Create the marker.
                dropoff = new google.maps.Marker({
                    position: clickedLocation,
                    map: map2,
                    draggable: true //make it draggable
                });
                //Listen for drag events!
                google.maps.event.addListener(dropoff, 'dragend', function(event){
                    // markerLocation1();
                });
            } else{
                //Marker has already been added, so just change its location.
                dropoff.setPosition(clickedLocation);
                console.log("Company Location"+dropoff.getPosition());
            }
            //Get the marker's location.
            // markerLocation1();
        });



  //clear markers from the map and replace them with new one
    function clearHomeMarker() {

        try {
            console.log("Company Location"+marker.getPosition());

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

    function clearHomeMarker2() {

        try {
            console.log("Company Location"+dropoff.getPosition());

            //  marker2.setMap(null);
        } catch (err) {
            console.log("Markers are not initialized ");
        }


        try {
            dropoff.setMap(null);
            dropoff = false ;
        } catch (err) {
            console.log("Marker is not initialized ");
        }

    }


    <!-- change map width when loaded from mobile-->

    var useragent = navigator.userAgent;
    var pickupMap = document.getElementById("map_canvas");
    var dropoffmap = document.getElementById("map_canvas2");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {

        pickupMap.style.width = '95%';
        dropoffmap.style.width = '95%';
        /* pickupMap.style.height = '100%';*/
        /*dropoffmap.style.height = '100%'; */

    } else {
        /* pickupMap.style.width = '600px';
         pickupMap.style.height = '800px';

         dropoffmap.style.height = '600px';
         dropoffmap.style.height = '800px';*/
    }





    $scope.showMap = function (mapID) {

        if($('#pickupmap').is(":visible")){
            console.log("map is visible");
            $('#pickupmap').hide();
            $('#hreflocation span').text("Edit location");

        }else {
            console.log("maop is not visible");
            $('#pickupmap').show();
            $('#hreflocation span').text("Default location");
            //change the button innet text label
        }

        }

    $scope.add = function (item) {
        $(item).text(parseInt($(item).text()) + 1);
        //fix css ;)
        $(item).css({"font-size":"x-large","color":"#757575"});

    }

    $scope.remove = function (item) {
        if (parseInt($(item).text()) > 0) {
            $(item).text(parseInt($(item).text()) - 1);
            //fix css ;)
            $(item).css({"font-size":"x-large","color":"#757575"});
        }
    }
    $scope.disableCash = function () {
        if ($('#cash').css('display') == 'none') {
            $("#cash").show();
            $("cashamount").prop('required',true);
        } else {
            $('#cash').hide();
            $("#cashamount").prop('required',false);
        }
    }









    //change this to be done by ng-router
    $scope.submit = function (form) {




 //for future imporve,emnt use custom ng-messagses ...
/*
        RequestForm.name.$error.required = true;
        $scope.RequestForm.map.$error.validationError =true;
        console.log( $scope.RequestForm.map.$error);
 */
        //ADD CUSTOM ERROR BETTER THAN HINTS



        //if the user wanted to change the default location, check the pickup and accordingly show error msg
        if($('#pickupmap').is(':visible')) {
            if (!pickup) {
                $('#pickuphint').show();
                console.log("map pickup error");
                return;
            }else {
                $('#pickuphint').hide();
                console.log(pickup);
            }
        }


        //user have to choose a dropoff location
        if (!dropoff){
            $('#dropoffhint').show();
            console.log("map dropoff error");
            return;
        }else {
            $('#dropoffhint').hide();
            console.log(dropoff);
        }


        //in case user have not choosen items type
        if(parseInt($("#SmallItems").text())==0 && parseInt($("#MediumItems").text())==0 && parseInt($("#LargeItems").text())==0){
            $("#itemshint").show();
            return;
        }else {
            $("#itemshint").hide();
        }


        //cash on delivery logic..
        if($scope.request.cashstatus == "nope"){
            $scope.request.cash =0;
            $('#cashhint').hide();
        } else if($scope.request.cashstatus =="yup"){
            if(typeof $scope.request.cash == "undefined"||$scope.request.cash == 0){
                $('#cashhint').show();
                return ;
            }else {
                $('#cashhint').hide();
                console.log($scope.request.cash);
            }
        }

        /*
        data needed to make a request is below:
        1- pickup address.
        2- dropoff address/
        3- name, mobile of package reciver.
        4- items in numbers: #small, #medium, #large.
        5- cash on delivery
        6- transportation fees.
         */
        requestDelivery();

               /*$('#requestcard').hide();
                $('#inprogress').show(); */

     }





   function requestDelivery() {

       console.log(pickup.getPosition().lat());
       console.log(pickup.getPosition().lng());

       console.log(dropoff.getPosition().lng());
       console.log(dropoff.getPosition().lng());

       //name and email already validated
       console.log($scope.request.name);
       console.log($scope.request.mobile);

       var items = [parseInt($("#SmallItems").text()),
           parseInt($("#MediumItems").text()),
           parseInt($("#LargeItems").text())];

       console.log("items: "+items);
       console.log("cash on delivery" +$scope.request.cash);
       transportation_fees = "15";
       console.log("fees: "+transportation_fees);
       if($scope.request.fees == "sender"){
           payed_by= 0;
       }else {
           payed_by= 1;
       }

       console.log("transportation fees payed by? "+$scope.request.fees);

       //later redirect the link attached to company id after registration
       id = "12313";

       var request = $.ajax({
           type: 'POST',
           url: 'http://34.200.125.97/kc/public/delivery/request',
           dataType: 'text',
           data: {
               id: id,
               latitude: pickup.getPosition().lat(),
               longitude: pickup.getPosition().lng(),
               d_latitude: dropoff.getPosition().lng(),
               d_longitude: dropoff.getPosition().lng(),
               name: $scope.request.name,
               phone: $scope.request.mobile,
               cash_on_delivery: $scope.request.cash,
               fees: transportation_fees ,
               payed_by: payed_by,
               small_items: items[0],
               medium_items: items[1],
               large_items: items[2]
           }
       });
       request.done(function (response) {
           console.log(response);
       }); // Ajax Call*/
       request.fail(function (jqXHR, textStatus) {
           console.log("request fail for the reason" + textStatus)
       });





   }









 })

