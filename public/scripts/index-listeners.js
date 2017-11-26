$(document).ready (function () {

  var currentPage = window.location.pathname;
  var currentUser = Number($('#currentUser').text());
  var usersPage   = Number(window.location.pathname.slice(7))

  function sortByFavor (maps) {
    return maps.sort( function (a, b) {
      return b.fav_count - a.fav_count;
    })
  }

  function sortByLastUpdate (maps) {
    return maps.sort( function (a, b) {
      return b.map_last_updated - a.map_last_updated;
    })
  }

  if(currentPage === '/maps/') {
    addMapsToMapPage();
  }

  else if (currentPage.match('/users/')) {
    addUserMapsToMapPage();
  }

  function addMapsToMapPage () {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/maps/load"
      }).done( function (maps) {

          $('#favorite-maps').prev().text('Top 3 Maps')
          $('#recent-maps').prev().text('All Maps')

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
                      <li>Map ID: ${map.map_id}</li>
                      <li>User: ${map.map_user_id}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })

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
                      <li>Map ID: ${map.map_id}</li>
                      <li>User: ${map.map_user_id}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })
      })
    })
  }

  function addUserMapsToMapPage () {
    $(function () {
      $.ajax({
        method: "GET",
        url: "/maps/load"
      }).done( function (maps) {

          var usersMaps = maps.filter( function(map) {
            return map.map_user_id === usersPage;
          })

          var usersContributions = maps.filter( function(map) {
            return map.map_user_id === usersPage;
          })

          $('#favorite-maps').prev().text('Your Favorite Maps')
          $('#recent-maps').prev().text('Maps you have edited')

          sortByFavor(usersMaps).slice(0,3).forEach((map) => {
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
                      <li>Map ID: ${map.map_id}</li>
                      <li>User: ${map.map_user_id}</li>
                    </ul>
                  </li>
                  </div>
                </a><br>`
              )
          })

          sortByLastUpdate(usersMaps).forEach((map) => {
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
                      <li>Map ID: ${map.map_id}</li>
                      <li>User: ${map.map_user_id}</li>
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


