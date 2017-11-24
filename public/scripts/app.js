$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("h1"));
    }
  });;
});


//this feeds the main page
$(() => {
  $.ajax({
      method: "GET",
      url: "/map/"
  }).done((maps) => {
    //1. here comes a reference to a function that compiles the top three maps
    //2. here comes a reference to a function that compiles the nine most recent maps
    //data comes in the following format:
  //     {
  //       map_id: ,
  //       map_name: ,
  //       map_description: ,
  //       map_image: ,
  //       map_createdAt: ,
  //       map_last_updated: ,
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

