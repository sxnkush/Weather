const API_key = "bb4da9c6051404c62d9d30025b8b91be"


const getTemp = async() => {
    const location = document.getElementById("location").value
    document.getElementById("location").value = null
    const [city, state_code='', country_code=''] = location.split(',').map(item => item.trim());
    const country = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state_code},${country_code}&limit=5&appid=bb4da9c6051404c62d9d30025b8b91be`)
    
    const ans = await country.json()
    
    const lat = ans[0].lat
    const lon = ans[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    
    const temp = await response.json()
    let city_class = document.getElementsByClassName('city')[0]
    city_class.innerHTML = `<h1>${temp.name}</h1> <p>${temp.sys.country}</p>`
    
    let temperature_class = document.getElementsByClassName("temperature")[0]

    if(temp.weather[0].description.match(/sunny/i) || temp.weather[0].description.match(/clear/i) )
    { 
        temperature_class.innerHTML = `<img src = "./sunny.svg"><h1>${temp.main.temp}&degC</h2>`
    }
    else
    { 
        temperature_class.innerHTML = `<img src = "./clouds.svg"><h1>${temp.main.temp}&degC</h2>`
    }

    console.log(temp)
    console.log(temp.weather[0].description)
    
    
    const poll = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    const air_poll = await poll.json()
    console.log(air_poll.list[0].main.aqi)

    const forecast_5 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`)
    const ans_forecast = await forecast_5.json()
    console.log(ans_forecast)
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
