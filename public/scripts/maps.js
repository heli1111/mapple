//Map options
function initMap(){

    var options = {
      zoom:8,
      center: {lat:43.6532, lng:-79.3832}
    }

    var mapList = [
        'map', 'map1', 'map2', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8', 'map9'
    ];

    for(let mapDiv of mapList) {
        console.log(document.getElementById(mapDiv));

    //New map
    var map = new 
    google.maps.Map(document.getElementById(mapDiv), options);
    
    //add eventListener for map clicks
    google.maps.event.addListener(map, 'click', 
    function(event){
      addMarker({coords:event.latLng});
    });
    //Array of markers
    var markers = [
              {coords: {lat:43.725422,lng:-79.452106},
              content: '<h2>Cheesecake Factory</h2>',
              description: '<h3>Best new restaurant in the city!</h3>',
              iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
              image: '<img src="https://www.fillmurray.com/g/140/100">'

              },
              {coords: {lat:43.649447,lng:-79.386370},
              content: '<h2>MoMo Fuku</h2>',
              iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
              }
    ];
    //loop array markers
    for (var i = 0; i < markers.length; i++){
      addMarker(markers[i])
    }

    //Add market function
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        draggable:true
      });
      //Check for custom icon
      if(props.iconImage){
        //Set icon image
        marker.setIcon(props.iconImage);
      }
      //Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content: `${props.content || ''}` + `${props.description || ''}` + `${props.image || ''}`
        });
        marker.addListener('mouseover', function(){
          infoWindow.open(map, marker);
        });
      }
    }

    }

}