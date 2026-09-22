let searchBtn = document.getElementById('Search');


searchBtn.addEventListener('click',function(){

    
let cityname = document.getElementById('City').value;

    if(cityname ===''){

        alert('pliz enter city name');

        return
    };

     
    async function geodata(){
    let geourl =await'https://geocoding-api.open-meteo.com/v1/search?name='+cityname+'&count=10&language=en&format=json&utm_source=chatgpt.com';
    
    let request =await fetch(geourl);

    let data= await request.json();

    console.log(data);

    return data;

    }

    geodata().then(function(data){
     
        let long = data.results[0].longitude;

        let lat = data.results[0].latitude;

           //get city  name.
    let city = document.getElementsByClassName('3small-text')[0];
    city.textContent=data.results[0].name;
     

    async function weatherurl(){

     let weather = await 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+long+'&hourly=temperature_2m&utm_source=chatgpt.com'+ '&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,cloud_cover,visibility,pressure_msl&timezone=auto&daily=sunrise,sunset';

     let asking = await fetch(weather);

     let result = await asking.json();

     console.log(result);

     return result

    }

weatherurl().then(function(data){

let temp =document.getElementsByClassName('temperature')[0];
temp.textContent=data.hourly.temperature_2m[0] + ' °C';

let stemp =document.getElementsByClassName('1small-text')[0];
stemp.textContent='it acctually feels like '+ data.hourly.temperature_2m[0] + ' °C'

//date formmating


let date = new Date();

//format for easy reading,

let formatDate = date.toLocaleDateString('en-US',{
   weekday: 'long',

   month: 'long',

   day: 'numeric',

    timeZone: data.timezone
});

let formatTime = date.toLocaleTimeString('en-US',{
   hour:'numeric',

   minute:'2-digit',

  timeZone: data.timezone
});

//display date and time

let displaydate = document.getElementsByClassName('2small-text')[0];
displaydate.textContent=formatDate+' at '+formatTime;


//weather vedio change

let code = data.hourly.weather_code[0];

console.log(code);

let weatherVideo = document.getElementsByClassName('vedio-back')[0];


if(code === 0){
    weatherVideo.src = 'weathervedios/19318533-hd_1080_1920_30fps.mp4';
}
else if(code >= 1 && code <= 3){
    weatherVideo.src = 'weathervedios/12460328-hd_1080_1920_60fps.mp4';
}
else if(code >= 51 && code <= 67){
    weatherVideo.src = 'weathervedios/149928-797491628.mp4';
}
else if(code >= 71 && code <= 77){
    weatherVideo.src = 'weathervedios/6620907-hd_1080_1920_24fps.mp4';
}
else if(code >= 80 && code <= 82){
    weatherVideo.src = 'weathervedios/14175663_2160_3840_25fps.mp4';
}
else if(code >= 95){
    weatherVideo.src = 'weathervedios/13629036_1080_1920_59fps.mp4';
}



let weatherText = document.getElementsByClassName('small-text description')[0];

if(code === 0){
    weatherText.textContent = 'Clear';
}
else if(code >= 1 && code <= 3){
    weatherText.textContent = 'Cloudy';
}
else if(code === 45 || code === 48){
    weatherText.textContent = 'Foggy';
}
else if(code >= 51 && code <= 57){
    weatherText.textContent = 'Drizzle';
}
else if(code >= 61 && code <= 67){
    weatherText.textContent = 'Rainy';
}
else if(code >= 71 && code <= 77){
    weatherText.textContent = 'Snowy';
}
else if(code >= 80 && code <= 82){
    weatherText.textContent = 'Rain Showers';
}
else if(code >= 85 && code <= 86){
    weatherText.textContent = 'Snow Showers';
}
else if(code >= 95){
    weatherText.textContent = 'Thunderstorm';
}

//other content 

let humidity =document.getElementsByClassName('value humidity')[0];

humidity.textContent=data.hourly.relative_humidity_2m[0]+' %';

//wind

let wind =document.getElementsByClassName('value wind')[0];

wind.textContent=data.hourly.wind_speed_10m[0]+' km/hr';

//sun-rise

let sunrise = new Date(data.daily.sunrise[0]);

let sunriseTime = sunrise.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: data.timezone
});

let sunriseText = document.getElementsByClassName('sun-row')[0];

sunriseText.innerHTML = sunriseTime + '<br>Sunrise';

//sun-set

let sunset = new Date(data.daily.sunset[0]);

let sunsettime = sunset.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: data.timezone
});

let sunsetText = document.getElementsByClassName('sun-row')[1];

sunsetText.innerHTML = sunsettime + '<br>Sunset';


//clouds

let clouds = document.getElementsByClassName('value clouds')[0];

clouds.textContent = data.hourly.cloud_cover[0] + ' %';

//visibility

let visibility = document.getElementsByClassName('value visibility')[0];

visibility.textContent = data.hourly.visibility[0] + ' m';

//pressure
let pressure = document.getElementsByClassName(' value pressure')[0];

pressure.textContent = data.hourly.pressure_msl[0] + ' hPa';


})


    });















































})









































