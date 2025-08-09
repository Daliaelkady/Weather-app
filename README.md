# 🌤️ Weather App

A sleek and accessible web application that fetches real-time weather information for any city worldwide using the OpenWeatherMap API.

## Features

- Search for any city’s current weather by name.
- Toggle temperature units between Celsius and Fahrenheit.
- Displays:
  - City name
  - Temperature
  - Weather description and icon
  - Local time with live ticking clock
  - Humidity
  - Wind speed
  - Sunrise and sunset times
- Loading spinner while fetching data.
- User-friendly error messages.
- Keyboard accessible and ARIA-labeled controls for accessibility.
- Glassmorphism-inspired translucent design with smooth animations.

## Demo

_Add your live demo link here if hosted online._

## Technologies Used

- HTML5
- CSS3 (Glassmorphism style, animations)
- Vanilla JavaScript (Fetch API, async/await)
- OpenWeatherMap API

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- OpenWeatherMap API key (free signup at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository:

2. Open the project folder and locate script.js.

3.Replace the apiKey value with your own OpenWeatherMap API key:

const apiKey = "YOUR_API_KEY_HERE";
4.Open index.html in your browser to run the app.

### Usage

Type a city name in the input box.

Click Get Weather or press Enter.

Toggle the switch to change temperature units between Celsius and Fahrenheit.

View the weather details displayed below the input area.

### Accessibility

ARIA labels and roles for improved screen reader support.

Live region updates for loading and error messages.

Keyboard accessible input, button, and toggle switch.

### Project Structure
weather-app/
├── index.html        # Main HTML structure
├── style.css         # Styling and animations
├── script.js         # JavaScript logic for API calls and UI updates
└── README.md         # Project documentation

### Customization
Change colors and styles by editing style.css.

Extend functionality by adding features like forecasts, location detection, or favorites.

### Troubleshooting
Verify your API key is valid and hasn’t exceeded usage limits.

Ensure an active internet connection.

Double-check the city name spelling for accurate results.

### Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork the repository and submit pull requests.

### License
This project is licensed under the MIT License © 2025 Dalia Elkady

