import svgCloud from '../../images/iconsweather/cloud.svg';
import svgClear from '../../images/iconsweather/clear.svg';
import svgHaze from '../../images/iconsweather/haze.svg';
import svgRain from '../../images/iconsweather/rain.svg';
import svgSnow from '../../images/iconsweather/snow.svg';
import svgStorm from '../../images/iconsweather/storm.svg';
import svgGeolocation from '../../images/iconsweather/carbonLocation.svg';
console.log(svgGeolocation);
const content = document.querySelector('.list-news');

markupWeather()

const refs = {
    weekday: document.querySelector('.weather__weekday'),
    dayYears: document.querySelector('.weather__date'),
    temperature: document.querySelector('.weather__temperature'),
    sky: document.querySelector('.weather__sky'),
    geolocation: document.querySelector('.weather__geolocation'),
    iconWeather: document.querySelector('.weather__icon'),
    buttonForWeatherSevenDay: document.querySelector('.weather__button'),
    linkForWeatherSevenDay: document.querySelector('.weather__link'),
    content: document.querySelector('section div.container'),
  
};

refs.buttonForWeatherSevenDay.addEventListener('click', onFetchSiteWeatherOnSevenDay)
function onFetchSiteWeatherOnSevenDay () {}

const data = new Date();

const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let year = 0;
let weekday = 0;
let month = 0;
let dayMonth = 0;

function getMon() {
month = months[data.getMonth()];
// refs.weekday.textContent = month;
console.log(month);
}

getMon();


function getMonDay() {
dayMonth = data.getUTCDate();
// refs.weekday.textContent = dayMonth;
console.log(dayMonth);
}

getMonDay();

function getWeekday() {
weekday = weekdays[data.getUTCDay()];
refs.weekday.textContent = weekday;
console.log(weekday);
}

getWeekday();

function getYear() {
year = data.getUTCFullYear();
// refs.weekday.textContent = year;
console.log(year);
}

getYear();


refs.dayYears.textContent = `${dayMonth} ${month} ${year}`;





// const API_KEY = "164a02a79a239efd4c817829a733c4d8";
const coordinatsUser = navigator.geolocation.getCurrentPosition(onSuccess, onError);
console.log(coordinatsUser);



function onSuccess (position) {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=164a02a79a239efd4c817829a733c4d8`).then(r => r.json()).then(result => weatherDet(result)).catch(error => { console.log(error) });
    console.log(latitude);
    console.log(longitude);
}

function onError (err) {
    console.log(err.message)
}

function weatherDet(data) {
  const city = data.name;
  const cityId = data.id;
  const temperature = Math.floor(data.main.temp);
  const sky = data.weather[0].main;
  const idWeather = data.weather[0].id;
  refs.geolocation.value = city;
  refs.sky.textContent = sky;
  refs.temperature.textContent = `${temperature} º`;
  refs.linkForWeatherSevenDay.href = `https://www.gismeteo.ua/ua/weather-${city.toLowerCase()}-${cityId}/10-days/`
  // refs.iconWeather = iconWeather;
  if (idWeather == 800) {
      refs.iconWeather.src = `${svgClear}`; 
    } else if (idWeather >= 200 && idWeather <= 232) {
      refs.iconWeather.src = `${svgStorm}`; 
    } else if (idWeather >= 600 && idWeather <= 622) {
      refs.iconWeather.src = `${svgSnow}`; 
    } else if (idWeather >= 701 && idWeather <= 781) {
      refs.iconWeather.src = `${svgHaze}`; 
    } else if (idWeather >= 801 && idWeather <= 804) {
      refs.iconWeather.src = `${svgCloud}`;
    } else if ((idWeather >= 500 && idWeather <= 531) || (id >= 300 && id <= 321)) {
      refs.iconWeather.src = `${svgRain}`; 
    }
  // console.log(iconWeather);
  return
}

        
function markupWeather() {
  return (content.innerHTML = `
  <li class="weather">
            <div class="weather__container">
                <span class="weather__temperature">2º</span>
                <div class="weather__iformation-for-weather">
                    <p class="weather__sky">Sunny</p>
                    <img class="weather__icon-geolocation" src=${svgGeolocation} alt="icon-geoloc">
                    <input class="weather__geolocation" type="text" name="geolocation" value="geolocation">
                </div>
            </div>
            <img class="weather__icon" src="" alt="Weather Icon">
            <p class="weather__weekday">Mon</p>
            <p class="weather__date">21 Jan 2021</p>
            <button class="weather__button"><a class="weather__link" href="https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D1%97%D0%B2" target="_blank" 
                rel="noopener noreferrer">weather for week</a></button>
        </li>`);
}




export {getMon, getMonDay, getWeekday, getYear, onSuccess, onError, weatherDet, markupWeather};