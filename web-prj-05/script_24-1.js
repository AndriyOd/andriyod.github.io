let gChosenCity;

GetDate();
SetInitialCity();
GetHourlyWeatherData();
// let a = Boolean(gChosenCity.firstElementChild);
// let a = Boolean(document.querySelector('#cities-grid-container').firstElementChild);
// let b = Boolean(document.querySelector('#X').firstElementChild);
// console.log(a);
// console.log(b);



// Set Initial City (Odesa);
function SetInitialCity() {
    let citiesArr = document.querySelectorAll('#cities-grid-container > div');
    citiesArr.forEach((item)=>{
    if (item.textContent == "Odesa") {
        item.classList.add('selected');
        gChosenCity = item;
    }
});
}

// Display Popup Window
document.querySelector('#wChangeButton').addEventListener('click',()=>{
    document.querySelector('#popup-background').style.display="block";
    document.querySelector('#popup-window').classList.add('active');
});

// Popup windows city selection
let cities = document.querySelectorAll('#cities-grid-container > div');
cities.forEach((item, index, array)=>{
    item.addEventListener('click', (event)=>{
        array.forEach((element)=>{
            element.classList.remove('selected');
        });
        event.target.classList.add('selected');
    })
});


// Close Popup Window (X-button)
document.querySelector('#X').addEventListener('click',()=>{
    document.querySelector('#popup-background').style.display="none";
    document.querySelector('#popup-window').classList.remove('active');
// Reset selected city to the chosen city (previous selection) 
    document.querySelector('#cities-grid-container > div.selected').classList.remove('selected');
    gChosenCity.classList.add('selected');
});


// Close Popup Window (CANCEL-button)
document.querySelector('#popup-cancel').addEventListener('click',()=>{
    document.querySelector('#popup-background').style.display="none";
    document.querySelector('#popup-window').classList.remove('active');
// Reset selected city to the chosen city (previous selection) 
    document.querySelector('#cities-grid-container > div.selected').classList.remove('selected');
    gChosenCity.classList.add('selected');
});


// Popup OK-button Handler
document.querySelector('#popup-ok').addEventListener('click',()=>{
    document.querySelector('#popup-background').style.display="none";
    document.querySelector('#popup-window').classList.remove('active');
// Set chosen city equal to the selected city (new selection) 
    gChosenCity = document.querySelector('#cities-grid-container > div.selected');
// Set new city to the weather widget
    let cellCity = document.querySelector('#wCity>p');
    cellCity.textContent = gChosenCity.textContent; 
    GetHourlyWeatherData();   
});



// async function GetCurrentWeatherData() {
//     let url = 'https://api.openweathermap.org/data/2.5/weather?q=Odesa&units=metric&appid=1f7ea79cbcdd7df3a6393527c12364ce';
//     let response = await fetch(url);
//     let data = await response.json();
//     // console.log('typeof data');
//     // console.log(typeof data);
//     // console.log('data');
//     // console.log(data);
//     return data;
// }

async function GetHourlyWeatherData() {
    // let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=46.4775&lon=30.7326&units=metric&appid=1f7ea79cbcdd7df3a6393527c12364ce';
    let urlp1 = 'https://api.openweathermap.org/data/2.5/onecall?';
    let urlp2 = gChosenCity.getAttribute("data-city-coord");
    let urlp3 = '&units=metric&appid=1f7ea79cbcdd7df3a6393527c12364ce';
    let url = urlp1 + urlp2 + urlp3;
    console.log(url);
    let response = await fetch(url);
    let reqData = await response.json();
    console.log('typeof reqData');
    console.log(typeof reqData);
    console.log('reqData');
    console.log(reqData);

    CurTempWrite(reqData);
    DailyTempWrite(reqData);
    AuxParamWrite(reqData);
    TomTempWrite(reqData);
    // console.log('Data extraction...');
    // const extr = data.daily; // Array
    // console.log(extr);
    // let a = new Date(1653790220);
    // console.log('New Date is ', a);
    // console.log('Dates that are obtained are:');
    // extr.forEach((item,index,array) => {
    //     let d = new Date(item.dt);
    //     console.log(d);
    // });
    // let extr = data.map ((obj) => {
    //     obj.
    // })
}

function GetDate() {
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    todayStr = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
    document.querySelector('#wCurDate').textContent = todayStr;

    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
    // console.log(tomorrow);
    tomorrowStr = `${days[tomorrow.getDay()]}, ${months[tomorrow.getMonth()]} ${tomorrow.getDate()} ${tomorrow.getFullYear()}`;
    document.querySelector('#wTomDate').textContent = tomorrowStr;
}


function CurTempWrite(data) {
    let curTemp = data.current.temp;
    // console.log('typeof curTemp is ', typeof curTemp);
    curTemp = curTemp.toFixed(1);
    // console.log('typeof curTemp.toFixed(1) is ', typeof curTemp);
    
    let block = document.querySelector('#wCurTemp');
    block.textContent = curTemp + ' \u{00B0}C';

    let descr = document.querySelector('#wCurDescr');
    descr.textContent = data.current.weather[0].description;

    let iconURL = 'http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'@2x.png';
    let weather_icon = document.querySelector('#wCurIconImg');
    weather_icon.src=iconURL;

}


function DailyTempWrite(data) {
    let hourlyTemp=[];
    for (i=0; i<4; i++){
        hourlyTemp[i] = document.createElement('p');
    };
    hourlyTemp[0].textContent = 'Night: ' + data.daily[0].temp.night.toFixed(1) + '\u{00B0}C';
    hourlyTemp[1].textContent = 'Morning: ' + data.daily[0].temp.morn.toFixed(1) + '\u{00B0}C';
    hourlyTemp[2].textContent = 'Day: ' + data.daily[0].temp.day.toFixed(1) + '\u{00B0}C';
    hourlyTemp[3].textContent = 'Evening: ' + data.daily[0].temp.eve.toFixed(1) + '\u{00B0}C';

    let block = document.querySelector('#wDailyTemp');

    while (block.firstElementChild) {
        block.removeChild(block.firstElementChild);
    }

    hourlyTemp.forEach((item) => {
        block.append(item);
    });

}

function AuxParamWrite(data) {
    let AuxParam=[];
    for (i=0; i<4; i++){
        AuxParam[i] = document.createElement('p');
    };
    AuxParam[0].textContent = 'Humidity: ' + data.current.humidity + '%';
    AuxParam[1].textContent = 'Pressure: '+ Math.round(data.current.pressure/1.333) + 'mm Hg';
    AuxParam[2].textContent = 'Wind speed: '+ data.current.wind_speed.toFixed(1) + 'm/sec';;
    AuxParam[3].textContent = 'Probability of precipitation: ' + Math.round(data.daily[0].pop*100) + '%';

    let block = document.querySelector('#wAuxParam');

    while (block.firstElementChild) {
        block.removeChild(block.firstElementChild);
    }

    AuxParam.forEach((item) => {
        block.append(item);
    });
}

function TomTempWrite(data) {
    let TomTemp=[];
    for (i=0; i<4; i++){
        TomTemp[i] = document.createElement('p');
    };
    TomTemp[0].textContent = 'Night: ' + data.daily[1].temp.night.toFixed(1) + '\u{00B0}C';
    TomTemp[1].textContent = 'Morning: ' + data.daily[1].temp.morn.toFixed(1) + '\u{00B0}C';
    TomTemp[2].textContent = 'Day: ' + data.daily[1].temp.day.toFixed(1) + '\u{00B0}C';
    TomTemp[3].textContent = 'Evening: ' + data.daily[1].temp.eve.toFixed(1) + '\u{00B0}C';

    let block = document.querySelector('#wTomParam');

    while (block.firstElementChild) {
        block.removeChild(block.firstElementChild);
    }

    TomTemp.forEach((item) => {
        block.append(item);
    });

}

