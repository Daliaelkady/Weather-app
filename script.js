const apiKey = "64f483da30bd62470fa5ca7895b58552";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const localTime = document.getElementById("localTime");
const weatherIcon = document.getElementById("weatherIcon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherInfo = document.getElementById("weatherInfo");
const message = document.getElementById("message");
const loadingSpinner = document.getElementById("loadingSpinner");
const unitToggle = document.getElementById("unitToggle");

let currentTempC = null;
let currentDt = null;
let currentTimezone = 0;
let localTimeInterval = null;

function showMessage(msg) {
  message.textContent = msg;
}

function toggleLoading(show) {
  loadingSpinner.style.display = show ? "block" : "none";
}

function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}

function formatTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatLocalTime(dt, timezone) {
  const localTimestamp = (dt + timezone) * 1000;
  const localDate = new Date(localTimestamp);

  const hours = localDate.getUTCHours().toString().padStart(2, "0");
  const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function updateTemperature() {
  if (currentTempC === null) return;
  if (unitToggle.checked) {
    const tempF = celsiusToFahrenheit(currentTempC);
    temperature.textContent = `${Math.round(tempF)}°F`;
  } else {
    temperature.textContent = `${Math.round(currentTempC)}°C`;
  }
}

async function getWeather(city) {
  if (!city) {
    showMessage("⚠️ Please enter a city name.");
    return;
  }

  showMessage("");
  weatherInfo.style.display = "none";
  toggleLoading(true);
  searchBtn.disabled = true;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("❌ City not found. Try again.");
      } else {
        throw new Error("⚠️ Unable to fetch weather data.");
      }
    }

    const data = await response.json();

    currentTempC = data.main.temp;
    currentDt = data.dt;
    currentTimezone = data.timezone;

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `🌬️ Wind Speed: ${data.wind.speed} m/s`;

    sunrise.textContent = `🌅 Sunrise: ${formatTime(data.sys.sunrise, currentTimezone)}`;
    sunset.textContent = `🌇 Sunset: ${formatTime(data.sys.sunset, currentTimezone)}`;

    updateTemperature();

    localTime.textContent = `🕒 Local Time: ${formatLocalTime(currentDt, currentTimezone)}`;
    if (localTimeInterval) clearInterval(localTimeInterval);

    localTimeInterval = setInterval(() => {
      currentDt += 1; // increment seconds for live ticking
      localTime.textContent = `🕒 Local Time: ${formatLocalTime(currentDt, currentTimezone)}`;
    }, 1000);

    weatherInfo.style.display = "block";
    showMessage("");

  } catch (error) {
    showMessage(error.message);
    weatherInfo.style.display = "none";
  } finally {
    toggleLoading(false);
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(cityInput.value.trim());
  }
});

unitToggle.addEventListener("change", updateTemperature);
