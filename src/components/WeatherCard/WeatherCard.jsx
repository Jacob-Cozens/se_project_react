import "./WeatherCard.css";
import cloudynight from "../../assets/CloudyNightBanner.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">69 &deg; F</p>
      <img src={cloudynight} alt="WEATHER" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
