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

//loading pages

//page 1: map (main page)

// $.ajax({
//   url: "/map",
//   method "GET"
// })

// $.ajax({
//   url: "/map/:id",
//   method "GET"
// })
