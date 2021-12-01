import PreviousMap from "postcss/lib/previous-map";
import moment from 'moment';
import { useEffect, useState } from "react";

const WWeather = (props) => {
  let currentParams = props.params.params;
  const [data, setData] = useState([]);
  const [displayDataD, setDisplayDataD] = useState({ city: '', temp: '', weather: '', humidity: '', date: '', day: '' })
  const [displayDataW, setDisplayDataW] = useState({ city: '', temp: '', weather: '', humidity: '', date: '', day: '' })

  useEffect((type, city) => {
    const fetchWeather = async (type, city) => {
      if (type == "daily") {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.weatherKey}`
        );
        const data = await response.json();
        setData(data)
      }
      if (type == "weekly") {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.weatherKey}`
        )
        let data = await response.json();
        setData(data)
      }
    };
    fetchWeather(currentParams.type, currentParams.city);

    console.log(data)
    if (currentParams.type == 'daily' && (data.length != 0)) {
      setDisplayDataD({ city: data.name, temp: data.main.temp, weather: data.weather[0].main, humidity: data.main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
    }
    if (currentParams.type == 'weekly' && (data.length != 0)) {
      setDisplayDataW({ city: data.city.name, temp: data.list[1].main.temp, weather: data.list[1].weather[0].main, humidity: data.list[0].main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
    }
  }, []);
  return (
    <div class="container mx-auto">
      <div>
        {currentParams.type == "daily" && (
          <div class="mt-2 flex flex-col justify-center bg-white w-full max-w-xs rounded-xl shadow p-4 ">
            <div>
            <div>day: {displayDataD.day}</div>
            <div>date: {displayDataD.date}</div>
            <div>ville: {displayDataD.city}</div>
            <div>temperature: {displayDataD.temp} &deg;C</div>
            <div>etat du ciel: {displayDataD.weather}</div>
            <div>humidity: {displayDataD.humidity}%</div>
            </div>
          </div>
        )}
      </div>
      <div>
        {currentParams.type == "weekly" && (
          <div class="mt-2 flex flex-col justify-center bg-white w-full max-w-xs rounded-xl shadow p-4 ">
            <p>city: {displayDataW.city}</p>
            <p>day: {displayDataW.day}</p>
            <p>date: {displayDataW.date}</p>
            <p>temp: {displayDataW.temp} &deg;C</p>
            <p>weather: {displayDataW.weather}</p>
            <p>humidity: {displayDataW.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  )
};

export default WWeather;
