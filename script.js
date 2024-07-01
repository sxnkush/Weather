const API_key = "bb4da9c6051404c62d9d30025b8b91be"


const getTemp = async() => {
    const location = document.getElementById("location").value
    document.getElementById("location").value = null
    const [city, state_code='', country_code=''] = location.split(',').map(item => item.trim());
    const country = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state_code},${country_code}&limit=30&appid=bb4da9c6051404c62d9d30025b8b91be`)
    const ans = await country.json()
    
    const lat = ans[0].lat
    const lon = ans[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    
    const temp = await response.json()

    const poll = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    const air_poll = await poll.json()

    let city_class = document.getElementsByClassName('city')[0]
    city_class.innerHTML = `<h1>${temp.name}</h1><br><p>${ans[0].state}</p> <p>${temp.sys.country}</p>`

    let d = new Date()
    let day = d.getDay()
    let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    let date_class = document.getElementsByClassName('date')[0]
    date_class.innerHTML = `${days[day-1]} ${temp.main.temp_max}&deg/${temp.main.temp_min}&deg`

    let temperature_class = document.getElementsByClassName("temperature")[0]

    if(temp.weather[0].description.match(/sunny/i) || temp.weather[0].description.match(/clear/i) )
    { 
        temperature_class.innerHTML = `<img src = "./sunny.svg"><h1>${temp.main.temp}&degC</h2>`
    }
    else if(temp.weather[0].description.match(/rain/i) || temp.weather[0].description.match(/thunderstorm/i) )
        { 
            temperature_class.innerHTML = `<img src = "./north.svg"><h1>${temp.main.temp}&degC</h2>`
        }
    else
    { 
        temperature_class.innerHTML = `<img src = "./clouds.svg"><h1>${temp.main.temp}&degC</h2>`
    }

    let description_class = document.getElementsByClassName("description")[0]
    let air_quality = air_poll.list[0].main.aqi
    let aqi = ""
    if(air_quality == 1) aqi = "Very Good";
    else if(air_quality == 2) aqi = "Good";
    else if(air_quality == 3) aqi = "Moderate";
    else if(air_quality == 4) aqi = "Poor";
    else if(air_quality == 5) aqi = "Very Poor";

    let weather_des = temp.weather[0].description[0].toUpperCase() + temp.weather[0].description.slice(1,)
    description_class.innerHTML = `<p>${weather_des}</p><p>Air Quality: ${aqi}`


    const forecast_5 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    const ans_forecast = await forecast_5.json()

    
    let forecast_class = document.getElementsByClassName("forecast")[0]
    forecast_class.innerHTML = ""
    for(let i = 0; i < 5; i++)
        {
            forecast_class.innerHTML += `<div id = "fore${i}" class = "fore"><p>${days[day]}</p></div>`
            day++
        }
        
    let gap = Number.parseInt(ans_forecast.list[0].dt_txt.split(" ")[1].split(":")[0])/3
    let count = 0;
    for(let i = gap; i < 40;i++)
        {
            if(ans_forecast.list[i].dt_txt.split(" ")[1] == "12:00:00")
                {
                    let fore = document.getElementById(`fore${count}`)
                    if(ans_forecast.list[i].weather[0].description.match(/sunny/i) || ans_forecast.list[i].weather[0].description.match(/clear/i) )
                        { 
                            fore.innerHTML += `<img src = "./sunny.svg"><p>${ans_forecast.list[i].weather[0].description}</p>`
                        }
                    else if(ans_forecast.list[i].weather[0].description.match(/rain/i) || ans_forecast.list[i].weather[0].description.match(/thunderstorm/i) )
                        { 
                                fore.innerHTML += `<img src = "./north.svg"><p>${ans_forecast.list[i].weather[0].description}</p>`
                        }
                    else
                        { 
                            fore.innerHTML += `<img src = "./clouds.svg"><p>${ans_forecast.list[i].weather[0].description}</p>`
                        }
                    fore.innerHTML += `<p>${ans_forecast.list[i].main.temp}&degC</p>`;
                    count++;
                }
        }

    //CSS
    document.getElementsByClassName("top")[0].style.opacity = 1;
    document.getElementsByClassName("forecast")[0].style.opacity = 1;
}



//OR
// const API_key = "4238fafe68c0411aaa30c9b277b41249"
// const city = "Pilibhit"
// const state_code = "Uttar Pradesh"
// const country_code = "IN"
// const country = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state_code},${country_code}&limit=5&appid=bb4da9c6051404c62d9d30025b8b91be`)

// const ans = await country.json()

// const lat = ans[0].lat
// const lon = ans[0].lon
// const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_key}&include=minutely`)

// const temp = await response.json()
// console.log(temp)
// console.log(temp.weather[0].description)
// console.log(temp.main.temp-273)
