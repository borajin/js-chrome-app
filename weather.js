const COORDS = "cords";
const WEATHERAPI_KEYS = "158dc1e604296685349f0a10cb7fe3cf";
const weather = document.querySelector(".js-weather");

function getWeather(latitude, longitude) {
  //해당 url의 데이터 가져오고 무사히 가져오면 then 실행
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHERAPI_KEYS}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      const temperature = json.main.temp;
      const place = json.name;

      weather.innerText = `${temperature}' @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't load your geo datae");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
