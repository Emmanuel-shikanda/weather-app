let searchBtn = document.getElementById('Search');

let weatherintro=document.getElementsByClassName('weather-intro')[0];

let weathercon = document.getElementsByClassName('weather-content')[0];

let errorSection = document.getElementsByClassName('error-section')[0]

let currentInfo = document.getElementsByClassName('current-info')[0];


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

    if(!data.results || data.results.length === 0){
        weatherintro.classList.remove('open');
        weatherintro.classList.add('close');
        weathercon.classList.remove('open');
        weathercon.classList.add('close');

    
    currentInfo.classList.remove('open');
    currentInfo.classList.add('close');

    errorSection.classList.remove('close');
    errorSection.classList.add('open');
    
    let errorLocation = document.getElementsByClassName('error-location')[0];
    errorLocation.textContent='We could not find,  '+cityname;

         // stop here, don't touch data.results[0]
    }else{
    errorSection.classList.remove('open');
    errorSection.classList.add('close');

    weathercon.classList.remove('close');
    weathercon.classList.add('open');

      currentInfo.classList.remove('close');
    currentInfo.classList.add('open');
    
}

        let long = data.results[0].longitude;

        let lat = data.results[0].latitude;

           //get city  name.
    let city = document.getElementsByClassName('3small-text')[0];
    city.textContent=data.results[0].name;

    let today = document.getElementById('today');
    today.textContent = data.results[0].name + '  Today highlights';
     
  let thisweek = document.getElementById('this-week');
 thisweek.textContent = data.results[0].name + '  This week  weather prediction ';



    async function weatherurl(){

     let weather = await`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}` +
  `&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,cloud_cover,visibility,pressure_msl` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max` +
  `&timezone=auto&forecast_days=7`; 

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
    weatherVideo.src = 'weathervedios/12908063 1080 1920 30Fps.mp4';
}
else if(code >= 1 && code <= 3){
    weatherVideo.src = 'weathervedios/12460328-Hd 1080 1920 60Fps(1).mp4';
}
else if(code >= 51 && code <= 67){
    weatherVideo.src = 'weathervedios/149928-797491628.mp4';
}
else if(code >= 71 && code <= 77){
    weatherVideo.src = 'weathervedios/6620907-Hd 1080 1920 24Fps.mp4';
}
else if(code >= 80 && code <= 82){
    weatherVideo.src = 'weathervedios/14175663 2160 3840 25Fps(1).mp4';
}
else if(code >= 95){
    weatherVideo.src = 'weathervedios/13629036 1080 1920 59Fps.mp4';
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
let pressure = document.getElementsByClassName('value pressure')[0];

pressure.textContent = data.hourly.pressure_msl[0] + ' hPa';


// weekly prediction

let cards = document.getElementsByClassName('card-day');

for(let i=0; i < 7; i++){

    //date-prediction

let date2 = new Date(data.daily.time[i]+'T12:00:00');

let dayName = date2.toLocaleDateString('en-US',
   {
  day:'numeric',
    weekday:'long',
    month:'long',
    

   });

cards[i].getElementsByClassName('day-name')[0].textContent = dayName;

//weather-change-prediction

let codePrediction = data.daily.weather_code[i];

let predictioDesc='';
let iconprediction='';


    if(codePrediction === 0){
        predictioDesc = 'Clear sky';
        iconprediction= '☀️';
    }
    else if(codePrediction >= 1 && codePrediction <= 3){
        predictioDesc= 'Cloudy';
        iconprediction = '☁️';
    }
    else if(codePrediction === 45 || codePrediction === 48){
        predictioDesc = 'Foggy';
        iconprediction= '🌫️';
    }
    else if(codePrediction >= 51 && codePrediction <= 57){
        predictioDesc = 'Drizzle';
        iconprediction = '🌦️'
    }
    else if(codePrediction >= 61 && codePrediction <= 67){
        predictioDesc = 'Rainy';
        iconprediction = '🌧️';
    }
    else if(codePrediction >= 71 && codePrediction <= 77){
        predictioDesc = 'Snowy';
        iconprediction = '❄️';
    }
    else if(codePrediction >= 80 && codePrediction <= 82){
        predictioDesc = 'Rain showers';
        iconprediction = '🌦️';
    }
    else if(codePrediction >= 95){
        predictioDesc= 'Thunderstorm';
        iconprediction = '⛈️';
    }

cards[i].getElementsByClassName('iconic')[0].textContent = iconprediction;
cards[i].getElementsByClassName('day-desc')[0].textContent = predictioDesc;

//temperature-prediction

 cards[i].getElementsByClassName('day-temp')[0].textContent =
        data.daily.temperature_2m_max[i] + ' °C  - ' +
        data.daily.temperature_2m_min[i] + ' °C ';

}

//removing-intro

weatherintro.classList.remove('open')
weatherintro.classList.add('close');

//adding-content

weathercon.classList.remove('close')
weathercon.classList.add('open');


})


    });






})









































