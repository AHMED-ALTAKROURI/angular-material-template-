var map ; //Will contain map object.
var marker = false; ////Has the user plotted their location marker?
var address ;
var geocoder;



function initMap() {

    geocoder = new google.maps.Geocoder;

    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(21.551343, 39.174972);

    //Map options.
    var options = {
        center: centerOfMap, //Set center.
        zoom: 10, //The zoom value.
        disableDefaultUI: true

    };

    //Create the map object.
    map = new google.maps.Map(document.getElementById('map_canvas'), options);



  console.log("hello world ");




    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);




    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
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















