import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length > 0) {
    weatherOption = filteredOptions[0];
  } else {
    weatherOption = weatherData.isDay
      ? defaultWeatherOptions.day
      : defaultWeatherOptions.night;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.day ? "day" : "night"}, ${
          weatherOption?.condition
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
