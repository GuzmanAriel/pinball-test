document.addEventListener('DOMContentLoaded', function () {
  const locationButton = document.getElementById('get-location');
  const pinballForm = document.getElementById('pinball-form');
  const longitudeInput = document.getElementById('longitude');
  const latitudeInput = document.getElementById('latitude');

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  locationButton.addEventListener('click', getLocation);

  function showPosition(position) {
    longitudeInput.value = position.coords.longitude;
    latitudeInput.value = position.coords.latitude
  }

  function appendData(data) {
    const resultTitle = document.querySelector('.result-title');
    const resultAddress = document.querySelector('.result-address');

    console.log(data.location);
    resultTitle.innerHTML = data.location.name;
    resultAddress.innerHTML = `${data.location.street} <br> ${data.location.city}, ${data.location.state} ${data.location.zip}`;
  }


  function handleFormSubmit (event) {
    event.preventDefault();

    const form = event.target;
    const url = form.action;

    try {
      const formData = new FormData(form);
      const data = [...formData.entries()];
      const latitude = formData.get('latitude');
      const longitude = formData.get('longitude');


      fetch(`https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${latitude}&lon=${longitude}`,
        {
          method: 'GET'
        }
      ).then(function (response) {
        return response.json();
      }).then(function (data) {
        appendData(data);
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
      });

    } catch (error) {
      console.error(error);
    }

  }

  pinballForm.addEventListener('submit', handleFormSubmit);

}, false);
