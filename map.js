

var map ; //Will contain map object.
var map2  ;
var pickup = false; ////Has the user plotted their location marker?
var dropoff =false;

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

    var options2 = {
        center: centerOfMap,
        zoom: 10,
        disableDefaultUI:true
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


// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
    searchBox2.addListener('places_changed', function() {
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


}

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















