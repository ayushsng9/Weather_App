const apiKey = 'bb6b3942d7be09f457442c3a7b12d669';
const apiBase = 'https://api.openweathermap.org/data/2.5/weather';


const getWeatherData = async (location) => {
    try {
        let req = await axios.get(`${apiBase}?q=${location}&appid=${apiKey}&units=metric`);
        return req.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};


const searchbar = document.querySelector(".searchbar");
const searchbtn = document.querySelector(".searchbtn");
const tempValue = document.querySelector(".temp");
const cityValue = document.querySelector(".city");
const humValue = document.querySelector(".h1");
const windValue = document.querySelector(".h3");
const img = document.querySelector(".img");
const card = document.querySelector(".card");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");


const updateWeatherInfo = (req, location) => {
    const temperature = `${req.main.temp}<sup>o</sup>C`;
    const humidity = `${req.main.humidity}%`;
    const wind = `${req.wind.speed} km/hr`;
    let icon = req.weather[0].main;
    if (icon === 'Haze') {
        icon = "Mist";
    }

    tempValue.innerHTML = temperature;
    cityValue.innerText = location;
    humValue.innerText = humidity;
    windValue.innerText = wind;
    img.src = `images/${icon}.png`;

   
    card.classList.add('active');
    weather.classList.add('active');
    details.classList.add('active');
};


searchbtn.addEventListener('click', async () => {
    const location = searchbar.value;

    
    card.classList.remove('active');
    weather.classList.remove('active');
    details.classList.remove('active');

    
    setTimeout(async () => {
        const req = await getWeatherData(location);

        if (req) {
            updateWeatherInfo(req, location);
        }
    }, 500); 
});
