const apiKey = "fe77f411804b3f153e8300f0094714d5"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

function updateUI(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("wind").innerText = data.wind.speed + " km/h";

    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    console.log("Veri başarıyla güncellendi:", data.name);
}

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    try {
        const response = await fetch(url);
        if (response.status === 404) {
            alert("Şehir bulunamadı!");
            return;
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error("Hava durumu çekilirken hata:", error);
    }
}

async function checkWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error("Konum verisi alınırken hata:", error);
    }
}

window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                checkWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            () => {
                checkWeather("Istanbul");
            }
        );
    } else {
        checkWeather("Istanbul");
    }
};

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value);
    }
});