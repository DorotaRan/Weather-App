const apiKey = 'ab06cf297e8f65ab0d86ffab4a9e88b4'
const url = `https://api.openweathermap.org/data/2.5/`


const locationSearchBox = document.querySelector('.location-search-box');
locationSearchBox.addEventListener('keypress' , sendRequest);

let current = new Date();
const date = document.querySelector('.date-container');
const currentTime  = document.createElement('h1');
let currentDestTime  = document.createElement('h1');
date.appendChild(currentTime);
date.appendChild(currentDestTime);

function timeBuilder(){
    let month=new Array();
    month[0]="January";
    month[1]="February";
    month[2]="March";
    month[3]="April";
    month[4]="May";
    month[5]="June";
    month[6]="July";
    month[7]="August";
    month[8]="September";
    month[9]="October";
    month[10]="November";
    month[11]="December";

    let wday=new Array();
    wday[0]="Sunday";
    wday[1]="Monday";
    wday[2]="Tuesday";
    wday[3]="Wednesday";
    wday[4]="Thursday";
    wday[5]="Friday";
    wday[6]="Saturday";

    let nwday = wday[current.getDay()];
    let nmonth= month[current.getMonth()];
    let nyear = current.getFullYear(); 
    let nday = current.getDate();
    let nhours = current.getHours();
    let nminutes = current.getMinutes(2);
    let fullDate = nwday+ ",  " +nday+" "+nmonth+" "+nyear+",  "+nhours+":"+nminutes
    return fullDate; 
}
currentTime.innerText = timeBuilder()

function sendRequest(event) {
    if (event.keyCode == 13) {
        getResults(locationSearchBox.value);
        console.log(locationSearchBox.value);
    }
};

function getResults(request) {
    fetch(`${url}weather?q=${request}&units=metric&APPID=${apiKey}`)
        .then(weather => {
            return weather.json();

        }).then(displayResults);
}

function displayResults(weather) {
    let currentDest = new Date();
    currentTime.innerText = "";
    let localTime = currentDest.getTime();
    let localOffset = currentDest.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let offset = (`${weather.timezone}`/60 /60);   
    let destTime = utc + (3600000 * offset);
    let newDate = new Date(destTime); 
    currentDestTime.innerText = (`${weather.name}`+ " time is " + newDate.toLocaleString());
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector('.temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>` 
    let conditions = document.querySelector('.description');
    conditions.innerText = `${weather.weather[0].description}` 
    let icon = document.querySelector('.city-icon > span');
    let imageCode = `${weather.weather[0].icon}`
    icon.innerHTML = `<img src="icons/${imageCode}.png">`;
    let wind = document.querySelector('.wind');
    wind.innerHTML = `<span>wind speed: </span>${Math.round(weather.wind.speed)}<span> m/s</span>` 
}