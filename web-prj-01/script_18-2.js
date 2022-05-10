let p1 = new Promise (function (resolve, reject) {
const xhr = new XMLHttpRequest();
xhr.open('GET','https://api.openweathermap.org/data/2.5/weather?q=Odesa&units=metric&appid=1f7ea79cbcdd7df3a6393527c12364ce');
//xhr.open('GET','https://api.openweathermap.org/data/2.5/weather?lat=46.4775&lon=30.7326&appid=1f7ea79cbcdd7df3a6393527c12364ce');
xhr.onload=function(){
    console.log('Inside the Promise');
    console.log('Non-parsed data');
    console.log(typeof xhr.response);
    console.log(xhr.response);

    console.log('Parsed data');
    console.log(typeof JSON.parse(xhr.response));
    console.log(JSON.parse(xhr.response));
    resolve(JSON.parse(xhr.response));
};
xhr.send();
});

p1.then(
    (data) => {
        console.log('=================');
        console.log('Inside THEN block');
        console.log(typeof data);
        console.log(data);

        //let tempVal = data.main.temp-273;
        let tempVal = data.main.temp;
        tempVal = Math.round(tempVal);
        let tempStr = document.getElementById('par');
        tempStr.innerHTML = `Temperature in ${data.name} now is ${tempVal} degrees.`; 
        //tempStr.innerHTML = `Temperature in ${data.name} today is ${tempVal.toFixed(2)}.`; 
        //localStorage.setItem('temp', tempVal);
        //localStorage.setItem('city', data.name);
    }
);

