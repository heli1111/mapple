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

          sortByFavor(maps).slice(0,3).forEach((map) => {
            $('#favorite-maps').append(
              `
                <li>
                  <a><img src="${map.map_image}" height="100"></a>
                  <p>Map ID: ${map.map_id}</p>
                  <p>Name: ${map.map_name}</p>
                  <p>User: ${map.map_user_id}</p>
                  <p>Likes: ${map.fav_count}</p>
                  <p>Last Update: ${map.map_last_updated}</p>
                </li>
              `
              )
          })

          sortByLastUpdate(maps).forEach((map) => {
            $('#recent-maps').append(
              `
                <li>
                  <a><img src="${map.map_image}" height="100"></a>
                  <p>Map ID: ${map.map_id}</p>
                  <p>Name: ${map.map_name}</p>
                  <p>User: ${map.map_user_id}</p>
                  <p>Likes: ${map.fav_count}</p>
                  <p>Last Update: ${map.map_last_updated}</p>
                </li>
              `
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

          sortByFavor(usersMaps).slice(0,3).forEach((map) => {
            $('#favorite-maps').append(
              `
                <li>
                  <a><img src="${map.map_image}" height="100"></a>
                  <p>Map ID: ${map.map_id}</p>
                  <p>Name: ${map.map_name}</p>
                  <p>User: ${map.map_user_id}</p>
                  <p>Likes: ${map.fav_count}</p>
                  <p>Last Update: ${map.map_last_updated}</p>
                </li>
              `
              )
          })

          sortByLastUpdate(usersMaps).forEach((map) => {
            $('#recent-maps').append(
              `
                <li>
                  <a><img src="${map.map_image}" height="100"></a>
                  <p>Map ID: ${map.map_id}</p>
                  <p>Name: ${map.map_name}</p>
                  <p>User: ${map.map_user_id}</p>
                  <p>Likes: ${map.fav_count}</p>
                  <p>Last Update: ${map.map_last_updated}</p>
                </li>
              `
              )
          })
      })
    })
  }




})


