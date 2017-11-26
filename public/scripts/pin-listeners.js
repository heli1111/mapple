$(document).ready(function () {

  let map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: <%=map.map_latitude%>, lng: <%=map.map_longitude%>},
                zoom: 8
            });

            // pin save button listener
  $('#addPinSave').click(() => {

      let mapId = location.pathname.toString().slice(6)

      // prepare data object
      let data = {
          pin_name: $('#addPinName').val(),
          pin_description: $('#addPinDescription').val(),
          pin_image: $('#addPinImage').val(),
          pin_createdAt: Date.now(),
          pin_latitude: $('#addPinLatitude').val(),
          pin_longitude: $('#addPinLongitude').val()
          pin_map_id: mapId
      };

      // send create pin post request
      $.ajax({
          url: '/pins/new',
          type: 'POST',
          data: data
      }).done((resp) => {
          console.log(resp);
          // add pin to map
          addMarker(data, map);
      }).fail((resp) => {
          console.log(resp);
          alert("FAILED TO ADD PIN");
      });

      // close modal
      $('#addPinModal').modal('hide');
  });

  $('#deletePin').click(() => {

      // send create pin put request
      let pin_id = $('#modifyPinID').val();
      let mapId = location.pathname.toString().slice(6)

      console.log('starting deletion for ' + pin_id);

      $.ajax({
          url: `/pins/${pin_id}/delete`,
          type: 'POST'
      }).done((resp) => {
          console.log(resp);
          //removeMarker(pin_id, map);
      }).fail((resp) => {
          console.log(resp);
          alert("FAILED TO DELETE PIN");
      });

      $('#modifyPinModal').modal('hide');

  });

  $('#updatePin').click(() => {
      let pin_id = $('#modifyPinID').val();
      let mapId = location.pathname.toString().slice(6)

      // prepare data object
      let data = {
          pin_name: $('#addPinName').val(),
          pin_description: $('#addPinDescription').val(),
          pin_image: $('#addPinImage').val(),
          pin_map_id: mapId
      };

      // send create pin put request
      $.ajax({
          url: `/pins/${pin_id}/update`,
          type: 'POST',
          data: data
      }).done((resp) => {
          console.log(resp);
          // add pin to map
          //removeMarker(data, map);
          //addMarker(data, map);
      }).fail((resp) => {
          console.log(resp);
          alert("FAILED TO ADD PIN");
      });

      $('#modifyPinModal').modal('hide');

  });

            // map click listener
  map.addListener('click', (event) => {

      // get lat/lng
      let lat = event.latLng.lat();
      let lng = event.latLng.lng();

      // initialize modal form data
      $('#addPinName').val('');
      $('#addPinDescription').val('');
      $('#addPinImage').val('');
      $('#addPinLatitude').val(lat);
      $('#addPinLongitude').val(lng);

      // show modal
      $('#addPinModal').modal('show');

  });


        // display marker on the map
  let addMarker = (pinData, map) => {

      let icon = {
          url: pinData.pin_image,
          scaledSize: new google.maps.Size(40, 40)
      }

      let marker = new google.maps.Marker({
          position: {
              lat: parseFloat(pinData.pin_latitude),
              lng: parseFloat(pinData.pin_longitude)
          },
          label: pinData.pin_name,
          icon: icon,
          map: map
      })

      marker.addListener('click', (event) => {
          $('#modifyPinID').val(pinData.pin_id);
          $('#modifyPinName').val(pinData.pin_name);
          $('#modifyPinDescription').val(pinData.pin_description);
          $('#modifyPinImage').val(pinData.pin_image);
          $('#modifyPinLatitude').val(pinData.pin_latitude);
          $('#modifyPinLongitude').val(pinData.pin_longitude);
          $('#modifyPinModal').modal('show');
      })
  }

  let removeMarker = (pinData, map) => {
            // TODO
  }

            // get all pins and show on the map
  let loadPins = () => {
    let mapId = location.pathname.toString().slice(6)

    $.ajax({
      url: `/maps/${mapId}/pins`,
      method: "GET"
    }).done (function (resp) {
        for(let key in resp) {
          let pinData = resp[key];
          addMarker(pinData, map);
        }
    })
  }

  loadPins();

})

