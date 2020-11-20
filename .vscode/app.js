const apiKey = 'ab06cf297e8f65ab0d86ffab4a9e88b4'
const url = `https://api.openweathermap.org/data/2.5/`
let current;


const locationSearchBox = document.querySelector('.location-search-box');
locationSearchBox.addEventListener('keypress' , sendRequest)
const dateContainer = document.querySelector('.date-container')
const currentDate  = document.createElement('h1');
dateContainer.appendChild(currentDate)

function dateBuilder(){
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

    current =  new Date();
    let nwday = wday[current.getDay()];
    let nmonth= month[current.getMonth()];
    let nyear = current.getFullYear(); 
    let nday = current.getDate();
    let fullDate= nwday+ ",  " +nday+" "+nmonth+" "+nyear
    return fullDate; 
}
dateContainer.innerText = dateBuilder()

function sendRequest(event) {
    if (event.keyCode == 13) {
        getResults(locationSearchBox.value);
        console.log(locationSearchBox.value);
    }
};

function getResults(request) {
    try {
        fetch(`${url}weather?q=${request}&units=metric&APPID=${apiKey}`)
        .then(weather => {
            return weather.json();

        }).then(displayResults);
    }
    catch(error){
        console.log(error);
        alert('error - city not found')
    }
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector('.temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>` 
    let conditions = document.querySelector('.description');
    conditions.innerText = `${weather.weather[0].description}` 
    let icon = document.querySelector('.city-icon > span');
    let imageCode = `${weather.weather[0].icon}`
    icon.innerHTML = `<img src="icons/${imageCode}.png">`
    let wind = document.querySelector('.wind');
    wind.innerHTML = `<span>Wind speed: </span>${Math.round(weather.wind.speed)}<span> m/s</span>` 
}



