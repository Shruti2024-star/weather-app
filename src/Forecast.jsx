import { useEffect, useState } from "react";
import './Forecast.css'; 


export default function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!city) return;

    const getForecast = async () => {
      try {
        setError(false);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) throw new Error("Forecast not found");

        const data = await response.json();

        const dailyForecast = data.list
          .filter((item, index) => index % 8 === 0)
          .map(item => ({
            date: item.dt_txt.split(" ")[0],
            min: item.main.temp_min,
            max: item.main.temp_max,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          }));

        setForecast(dailyForecast);
      } catch (err) {
        console.log("Forecast error:", err);
        setError(true);
      }
    };

    getForecast();
  }, [city]);

  if (error) return <p style={{ color: "red" }}>Unable to fetch forecast</p>;
  if (!forecast.length) return <p>Loading forecast...</p>;

  return (
    <div className="forecastCard">
      <h3>5-Day Forecast for {city}</h3>
      <div className="forecastGrid">
        {forecast.map(day => (
          <div key={day.date} className="forecastDay">
            <h4>{day.date}</h4>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="weather icon"
            />
            <p>{day.description}</p>
            <p>Min:{day.min}°C Max:{day.max}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}


