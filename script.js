const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const API_KEY = "048a7ca406024669e69342eda7ee933d";

const input = document.querySelector("input");
const showBtn = document.querySelector("button");
const h1 = document.querySelector("h1");
const span = document.querySelector("span");
const tempSelect = document.querySelector("#temp");
const desc = document.querySelector(".desc");
const langSelect = document.querySelector("#lang");
const image = document.querySelector(".image");
const container = document.querySelector(".container");

const fetchData = async (cityName, tempType, lang) => {
  const response = await fetch(
    API_URL +
      cityName +
      "&appid=" +
      API_KEY +
      "&units=" +
      tempType +
      "&lang=" +
      lang
  );
  const data = await response.json();
  return data;
};

const showUI = async () => {
  const cityName = input.value.trim();
  const tempType = tempSelect.value;
  const lang = langSelect.value;

  if (!cityName) {
    alert("please enter a city name");
  } else {
    const result = await fetchData(cityName, tempType, lang);
    h1.textContent = `${result.name} ${result.sys.country}`;
    span.textContent = tempType == "metric" ?  Math.round(result.main.temp) + "°C"  : Math.round(result.main.temp) + "°F";
    desc.textContent = result.weather[0].description;
    input.value = "";
    container.style.cssText = `height:600px;`;

    container.addEventListener("mouseover", (e) => {
      container.style.boxShadow = "rgba(0, 0, 0, 0.9) 0px 0px 30px ";
    });
    container.addEventListener("mouseout", (e) => {
      container.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.5)";
    });
    switch (result.weather[0].main) {
      case "Clear":
        image.src = "/img/clear.png";
        break;
      case "Rain":
        image.src = "/img/rain.png";
        break;
      case "Snow":
        image.src = "/img/snow.png";
        break;
      case "Clouds":
        image.src = "/img/clouds.png";
        break;
      case "Mist":
        image.src = "/img/haze.png";
        break;
      case "Haze":
        image.src = "/img/haze.png";
        break;
      default:
        image.src = "";
    }
    return result;
  }
};

showBtn.addEventListener("click", showUI);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showUI();
  }
});
