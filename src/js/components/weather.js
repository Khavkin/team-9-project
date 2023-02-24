import svgCloud from '../../images/iconsweather/cloud.svg';
import svgClear from '../../images/iconsweather/clear.svg';
import svgHaze from '../../images/iconsweather/haze.svg';
import svgRain from '../../images/iconsweather/rain.svg';
import svgSnow from '../../images/iconsweather/snow.svg';
import svgStorm from '../../images/iconsweather/storm.svg';
import svgGeolocation from '../../images/iconsweather/carbonLocation.svg';

const data = new Date();

function updateDate() {
    getMon();
    getMonDay();
    getWeekday();
    getYear();
}

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let year = 0;
let weekday = 0;
let month = 0;
let dayMonth = 0;
function getMon() {
    month = months[data.getMonth()];
}

function getMonDay() {
    dayMonth = data.getUTCDate();
}

function getWeekday() {
    weekday = weekdays[data.getUTCDay()];
}

function getYear() {
    year = data.getUTCFullYear();
}

// const API_KEY = "164a02a79a239efd4c817829a733c4d8";
function geolocateUpdate() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=164a02a79a239efd4c817829a733c4d8`).then(r => r.json()).then(result => weatherDet(result)).catch(error => { console.log(error) });
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=164a02a79a239efd4c817829a733c4d8`
    )
        .then(r => r.json())
        .then(result => weatherDet(result))
        .catch(error => {
            console.log(error);
        });
}

function onError(err) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=50.4199177&lon=30.4983085&units=metric&appid=164a02a79a239efd4c817829a733c4d8`
    )
        .then(r => r.json())
        .then(result => weatherDet(result))
        .catch(error => {
            console.log(error);
        });
    console.log(err.message);
}
let iconIdWeather;
function weatherDet(data) {
    const idWeather = data.weather[0].id;

    if (idWeather == 800) {
        iconIdWeather = `${svgClear}`;
    } else if (idWeather >= 200 && idWeather <= 232) {
        iconIdWeather = `${svgStorm}`;
    } else if (idWeather >= 600 && idWeather <= 622) {
        iconIdWeather = `${svgSnow}`;
    } else if (idWeather >= 701 && idWeather <= 781) {
        iconIdWeather = `${svgHaze}`;
    } else if (idWeather >= 801 && idWeather <= 804) {
        iconIdWeather = `${svgCloud}`;
    } else if (
        (idWeather >= 500 && idWeather <= 531) ||
        (id >= 300 && id <= 321)
    ) {
        iconIdWeather = `${svgRain}`;
    }
    updateDate();
    const el = document.querySelector('.weather');
    //console.log(el);
    if (el)
        el.insertAdjacentHTML(
            'afterbegin',
            `<div class="weather__container">
                <span class="weather__temperature">${Math.floor(
                    data.main.temp
                )}º</span>
                <div class="weather__iformation-for-weather">
                    <p class="weather__sky">${data.weather[0].main}</p>
                    <img class="weather__icon-geolocation" src=${svgGeolocation} alt="icon-geoloc">
                    <input class="weather__geolocation" type="text" name="geolocation" value="${
                        data.name
                    }">
                </div>
            </div>
            <img class="weather__icon" src="${iconIdWeather}" alt="Weather Icon">
            <p class="weather__weekday">${weekday}</p>
            <p class="weather__date">${dayMonth} ${month} ${year}</p>
            <a class="weather__link-but" href="https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D1%97%D0%B2"
                target="_blank" rel="noopener noreferrer">weather for week</a>`
        );

    return `
    <li class="weather">
            <div class="weather__container">
                <span class="weather__temperature">${Math.floor(
                    data.main.temp
                )}º</span>
                <div class="weather__iformation-for-weather">
                    <p class="weather__sky">${data.weather[0].main}</p>
                    <img class="weather__icon-geolocation" src=${svgGeolocation} alt="icon-geoloc">
                    <input class="weather__geolocation" type="text" name="geolocation" value="${
                        data.name
                    }">
                </div>
            </div>
            <img class="weather__icon" src="${iconIdWeather}" alt="Weather Icon">
            <p class="weather__weekday">${weekday}</p>
            <p class="weather__date">${dayMonth} ${month} ${year}</p>
            <a class="weather__link-but" href="https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D1%97%D0%B2"
                target="_blank" rel="noopener noreferrer">weather for week</a>
  </li>`;
}

// geolocateUpdate();
export {
    getMon,
    getMonDay,
    getWeekday,
    getYear,
    onSuccess,
    onError,
    weatherDet,
    markupWeather,
    geolocateUpdate,
    updateDate,
};
