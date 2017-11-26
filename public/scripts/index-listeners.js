$(document).ready (function () {

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

  $(function () {
    $.ajax({
      method: "GET",
      url: "/maps/load"
    }).done( function (maps) {
        maps.forEach((map) => {
          $('#favorite-maps').append(
            `
              <li>
                <p>${map.map_id}</p>
                <a><img src="${map.map_image}"></a>
              </li>
            `
            )
        })
    })
  })
})


