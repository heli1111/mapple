// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("h1"));
//     }
//   });;
// });

function sortBylastUpdate = (maps) {
  return maps.sort( function (a, b) {
    return b.map_last_updated - a.map_last_updated;
  })
};

function sortByFavor = (maps) {
  return maps.sort( function (a, b) {
    return b.fav_count - a.fav_count;
  })
};

function createRecentMapElement = (map, index, pins) {
  $('#recent-maps-container')
    .append(
      $("div").addClass("col-md-4")
        .append(
          $("div").attr("id", `map${index}`)
        )
    )

  var newMap = new google.maps.Map(document.getElementById(`map${index}`), {
    center: {
      lat: Number(map.map_latitude),
      lng: Number(map.map_longitude)
    },
    zoom: 8 //arbitrarily selected default value based on Google's zoom level options
  })

  var markersToMap = pins.filter( function(pin) {
    pin.pin_map_id === map.map_id;
  })

  markersToMap.forEach( function(marker) {
    {coords: {
      lat: marker.pin_latitude,
      lng: marker.pin_longitude
      }
  }
  })

}

function compileMostFavoredMaps (maps) {
  sortByFavor(maps).forEach( function (map, index) {
    createMapElement(map, index);



         // <div class="col-md-4">
         //      <div id="map1"></div>
  })
}

function compileMostRecentMaps (maps) {
  var pins = maps.pinData;
  sortBylastUpdate(maps.mapData).forEach( function (map, index) {
    createRecentMapElement(map, index, pins);


    // $('#recent-maps-container').append()

         // <div class="col-md-4">
         //      <div id="map1"></div>
  })
}

function compileSingleMap (mapData) {
    $('#recent-maps-container').append()

         // <div class="col-md-4">
         //      <div id="map1"></div>
}



function initMap() {
  //declare url, depends on the page the user are var url = /map/
  var defaultZoom = 8;

  if (/* THE URL IS /MAP/:ID */) {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/map/:id" //to be specified
      }).done( function (mapData) {
        compileSingleMap(mapData);
      })
    })
  }

  else if (/* THE URL IS /MAP/ */) {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/map/"
      }).done( function (maps) {
        compileMostFavoredMaps(maps);
        compileMostRecentMaps(maps);
      })
    })
  }

  else if (/* THE URL IS /USER/ */) {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/user/"
      }).done( function (maps) {
        compileMostFavoredMaps(maps.usersFavorites);
        compileMostRecentMaps(maps.usersContributions);
      })
    })
  }











//this feeds the main page
$(() => {
  $.ajax({
      method: "GET",
      url: "/map/"
  }).done((maps) => {
    //1. here comes a reference to a function that compiles the top three maps
    compileMostFavoredMaps(maps)
    //2. here comes a reference to a function that compiles the nine most recent maps
    compileMostRecentMaps(maps)
    //data comes in the following format:
  //     {
  //       map_id: ,
  //       map_name: ,
  //       map_description: ,
  //       map_image: ,
  //       map_createdAt: ,
  //       map_last_updated: ,
  //       map_latitude: ,
  //       map_longitude: ,
  //       map_user_id: ,
  //       pin_id: ,
  //       pin_name: ,
  //       pin_description: ,
  //       pin_image: ,
  //       pin_createdAt: ,
  //       pin_user_id: ,
  //       pin_map_id: ,
  //       fav_count:
  //     }
  // })
});

//this feeds a particular map's page
$(() => {
  var id = //map's id
  var url = `/map/${id}`
  $.ajax({
      method: "GET",
      url: "/map/"
  }).done((maps) => {
    // function that complices a map page
    // data in format above
});


//this feeds a user's page
$(() => {
  var id = //logged user
  var url = `/user/${id}`
  $.ajax({
      method: "GET",
      url: url
  }).done((maps) => {
    //here comes a reference to a function that compiles a map element
    //data comes in the following format:
      // { usersFavorites: {...}, usersContributions: {...} }
      // for {...} see above
  })
});

