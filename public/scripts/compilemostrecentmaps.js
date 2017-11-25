function sortBylastUpdate = (maps) {
  maps.sort( function (a, b) {
    return b.map_last_updated - a.map_last_updated
  })
};

function createMapElement = (map) {
  // --> maps.js

}

module.exports = function compileMostRecentMaps (maps) {
  sortBylastUpdate(maps).forEach( function (map) {
    $('#recent-maps-container').append()

         // <div class="col-md-4">
         //      <div id="map1"></div>
  })

}


// $('#tweet-container').prepend(createTweetElement(tweet));

// <script async defer
//  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuw3H9Ze9hLg4XxnnJA6EpzPYs1CAK6qU&callback=initMap">
// </script>
