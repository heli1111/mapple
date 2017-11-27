//index-listeners.js
//listening events on the index page (map lists)

$(document).ready (function () {

  //helper variables to identify path, user and page
  var currentPage = window.location.pathname;
  var currentUser = Number($('#currentUser').text());
  var usersPage   = Number(window.location.pathname.slice(7))

  //sorts maps by number of likes
  function sortByFavor (maps) {
    return maps.sort( function (a, b) {
      return b.fav_count - a.fav_count;
    })
  }

  //sorts maps by the time
  function sortByLastUpdate (maps) {
    return maps.sort( function (a, b) {
      return b.map_last_updated - a.map_last_updated;
    })
  }

  //renders maps on the main (maps) page
  if(currentPage === '/maps/') {
    addMapsToMapPage();
  }

  //renders maps on the users' profile pages
  else if (currentPage.match('/users/')) {
    addUsersFavoriteMaps();
    addUsersContributions();
  }

  //gets applicable maps data for maps page
  function addMapsToMapPage () {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/maps/load"
      }).done( function (maps) {

        //renames headings according to the content
          $('#favorite-maps').prev().text('Top 3 Maps')
          $('#recent-maps').prev().text('All Maps')

        //adds map elements to the page that are the most favored - the top four (or less)
          sortByFavor(maps).slice(0,3).forEach((map, index) => {
            $('#favorite-maps').append(
              `<a href="/maps/${map.map_id}">
                <div class="map-list-item">
                  <li>
                    <img src="${map.map_image}" class="map-image">
                    <ul class="map-info">
                      <li class="map-name">${map.map_name}</li>
                      <li class="map-likes"><b>${map.fav_count || 0}</b> users liked this map</li>
                      <li class="map-description">${map.map_description}</li>
                      <li>Last Update: ${map.map_last_updated}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })

        //add all map elements to the page in time order
          sortByLastUpdate(maps).forEach((map) => {
            $('#recent-maps').append(
              `<a href="/maps/${map.map_id}">
                <div class="map-list-item">
                  <li>
                    <img src="${map.map_image}" class="map-image">
                    <ul class="map-info">
                      <li class="map-name">${map.map_name}</li>
                      <li class="map-likes"><b>${map.fav_count || 0}</b> users liked this map</li>
                      <li class="map-description">${map.map_description}</li>
                      <li>Last Update: ${map.map_last_updated}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })
      })
    })
  }

  //gets applicable maps data for users' profile page: the most favored ones
  //similar logic as above
  function addUsersFavoriteMaps () {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/maps/load-user-maps"
      }).done( function (maps) {

          $('#favorite-maps').prev().text('My Favorite Maps')
          $('#recent-maps').prev().text('Maps I added pins to')

        //as opposed to the maps page, there is no limit on liked maps to render
          sortByFavor(maps).forEach((map) => {
            $('#favorite-maps').append(
              `<a href="/maps/${map.map_id}">
                <div class="map-list-item">
                  <li>
                    <img src="${map.map_image}" class="map-image">
                    <ul class="map-info">
                      <li class="map-name">${map.map_name}</li>
                      <li class="map-likes"><b>${map.fav_count || 0}</b> users liked this map</li>
                      <li class="map-description">${map.map_description}</li>
                      <li>Last Update: ${map.map_last_updated}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })
      })
    })
  }

  //gets applicable maps data for users' profile page
  //the ones that the user own or contributed to
  function addUsersContributions () {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/maps/load-user-contributions"
      }).done( function (maps) {
          sortByLastUpdate(maps).forEach((map) => {
            $('#recent-maps').append(
              `<a href="/maps/${map.map_id}">
                <div class="map-list-item">
                  <li>
                    <img src="${map.map_image}" class="map-image">
                    <ul class="map-info">
                      <li class="map-name">${map.map_name}</li>
                      <li class="map-likes"><b>${map.fav_count || 0}</b> users liked this map</li>
                      <li class="map-description">${map.map_description}</li>
                      <li>Last Update: ${map.map_last_updated}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })
        })
    })
  }



})


