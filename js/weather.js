const apiKey = "a58c8de8988641e486c91938262707";
const apiUrl = "http://api.weatherapi.com/v1/current.json?";
const submitBtn = document.querySelector(".search-btn");
const serach = document.querySelector("#city");

async function weatherNow(city) {
  let response = await fetch(apiUrl + "&q=" + city + "&key=" + apiKey);
  let data = await response.json();
  if (response.status >= 200 && response.status < 300) {
    let body = document.querySelector(".body-weather");
    if (serach) {
      body.style.display = "block";
      let img = document.querySelector("#weather-img");
      if (data.current.condition.text.toLowerCase().includes("sunny")) {
        img.src = "img/sunny.png";
      } else if (data.current.condition.text.toLowerCase().includes("Cloudy")) {
        img.src = "img/cloudy.png";
      } else if (
        data.current.condition.text.toLowerCase().includes("drizzle")
      ) {
        img.src = "img/drizzle.png";
      } else if (
        data.current.condition.text.toLowerCase().includes("sandstorm")
      ) {
        img.src = "img/sand.png";
      } else if (
        data.current.condition.text.toLowerCase().includes("thunder")
      ) {
        img.src = "img/storm.png";
      } else if (data.current.condition.text.toLowerCase().includes("haze")) {
        img.src = "img/haze.png";
      } else if (data.current.condition.text.toLowerCase().includes("clear")) {
        img.src = "img/clear-sky.png";
      } else if (data.current.condition.text.toLowerCase().includes("snow")) {
        img.src = "img/snow.png";
      } else if (
        data.current.condition.text.toLowerCase().includes("overcast")
      ) {
        img.src = "img/overcast.png";
      } else {
        img.src = "img/unkown.png";
      }
      document.querySelector(".temp").innerHTML =
        Math.round(data.current.temp_c) +
        " °C - " +
        data.current.condition.text;
      document.querySelector(".city-temp").innerHTML = data.location.name;
      document.querySelector(".percent").innerHTML =
        data.current.humidity + "%";
      document.querySelector(".speed").innerHTML =
        data.current.wind_kph + "KM/H";
      serach.value = "";
      console.log(data);
    }
  } else {
    document.querySelector(".body-weather").innerHTML = "";
    let weather = document.querySelector(".weather-cont");
    let div = document.createElement("div");
    div.className = "error-msg";
    div.innerHTML = "Invalid City Name";
    weather.appendChild(div);
    serach.value = "";
  }
}
submitBtn.addEventListener("click", () => {
  weatherNow(serach.value);
});

//current.temp_c
//current.humidity
//current.wind_kph
//locatin.name
