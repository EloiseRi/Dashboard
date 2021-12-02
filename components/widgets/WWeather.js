import moment from 'moment';
import { useEffect, useState } from "react";

const WWeather = (props) => {
  let currentParams = props.params.params;
  const [data, setData] = useState([]);
  const [calcWeekly, setWeekly] = useState({});

  const [displayDataD, setDisplayDataD] = useState({ icon: '', city: '', temp: '', weather: '', humidity: '', date: '', day: '' })
  const [displayDataW, setDisplayDataW] = useState({ icon: '', city: '', temp: '', weather: '', humidity: '', date: '', day: '' })

  useEffect((type, city) => {
    const fetchWeather = async (type, city) => {
      if (type == "daily") {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.weatherKey}`
        );
        const data = await response.json();
        setData(data)
        console.log(data)
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
      setDisplayDataD({ icon: data.weather[0].icon, city: data.name, temp: data.main.temp, weather: data.weather[0].main, humidity: data.main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
    }
    if (currentParams.type == 'weekly' && (data.length != 0)) {
      setDisplayDataW({ icon: data.list[1].weather[0].icon, city: data.city.name, temp: data.list[1].main.temp, weather: data.list[1].weather[0].main, humidity: data.list[0].main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
      setWeekly(data.list)
      console.log(data.list)
    }
  }, []);
  return (
    <div class="container mx-auto">
      <div>
        {currentParams.type == "daily" && (
          <div class="relative mt-2 flex flex-col justify-center bg-white w-full max-w-xs rounded-xl shadow-lg p-4 ">
            <div>{displayDataD.date}, {displayDataD.day}</div>
            <div class="font-family: -apple-system text-sm">{displayDataD.city}</div>
            <div class="flex flex-col">
              <img class="w-24 mx-auto"src={`http://openweathermap.org/img/w/${displayDataD.icon}.png`} />
              <div class="h-6 text-xl">{Math.round(displayDataD.temp)}&deg;C</div>
            </div>
            <div class="text-lg p-0">{displayDataD.weather}</div>
            <div class="absolute bottom-2 right-2 font-family: -apple-system text-sm">humidity: {displayDataD.humidity}%</div>
          </div>
        )}
      </div>
      <div>
        {currentParams.type == "weekly" && (
           <div class="relative mt-2 flex flex-col justify-center bg-white w-full max-w-xs rounded-xl shadow p-4 ">
           <div>{displayDataW.date}, {displayDataW.day}</div>
           <div class="font-family: -apple-system text-sm">{displayDataW.city}</div>
           <div class="flex flex-col">
             <img class="w-24 mx-auto"src={`http://openweathermap.org/img/w/${displayDataW.icon}.png`} />
             <div class="h-6 text-xl">{Math.round(displayDataW.temp)} &deg;C</div>
           </div>
           {/* <div>{calcWeekly}</div> */}
           <div>{displayDataW.weather}</div>
           <div class="absolute bottom-2 right-2 font-family: -apple-system text-sm">humidity: {displayDataW.humidity}%</div>
         </div>
        )}
      </div>
    </div>
  )
};

export default WWeather;
