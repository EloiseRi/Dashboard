import { useEffect, useState } from "react";
import moment from 'moment';

const useFindWeather = (props) => {
  const [city, setCity] = useState(props.city);
  const [type, setType] = useState(props.type);
  const [data, setData] = useState(null);

  return {
    city,
    setCity,
    data,
    fetchWeather: async () => {
      try {
        if (type == "daily") {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weatherKey}`
          );
          let result = await response.json();
          setData(result);
          return;
        }
        if (type == "weekly") {
          let response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.weatherKey}`
          );
          let result = await response.json();
          setData(result);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    },
  };
};

const Weather = (props) => {
  const [update, setUpdate] = useState(false);
  let currentParams = props.params.params;
  let widgetId = props.params._id;
  const { fetchWeather, city, setCity, data } = useFindWeather(currentParams);

  const [displayDataD, setDisplayDataD] = useState({ icon: '', city: '', temp: '', weather: '', humidity: '', date: '', day: '' })
  const [displayDataW, setDisplayDataW] = useState({ icon: '', city: '', temp: '', weather: '', humidity: '', date: '', day: '' })

  const handleChange = async (e) => setCity(e.target.value);
  const handleSubmit = async () => {
    fetchWeather(currentParams);
    await fetch("/api/widgets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        req_type: "WEATHER",
        _id: widgetId,
        city: city,
      }),
    });
    setUpdate(!update);
  };

  useEffect(() => {
    fetchWeather(currentParams.type, currentParams.city);
    if (currentParams.type == 'daily' && (data.length != 0)) {
      setDisplayDataD({ icon: data.weather[0].icon, city: data.name, temp: data.main.temp, weather: data.weather[0].main, humidity: data.main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
    }
    if (currentParams.type == 'weekly' && (data.length != 0)) {
      setDisplayDataW({ icon: data.list[1].weather[0].icon, city: data.city.name, temp: data.list[1].main.temp, weather: data.list[1].weather[0].main, humidity: data.list[0].main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
      setWeekly(data.list)
    }
  }, [update]);

  return (
     <div class="container mx-auto">
       <h1>Weather</h1>
       <input type="text" placeholder={city} onChange={handleChange} />
       <button onClick={handleSubmit}>Update city</button>
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
  );
};

export default Weather;



// import '../css/grid.css'
// import React, { Component } from "react";
// import '/node_modules/react-grid-layout/css/styles.css';
// import '/node_modules/react-resizable/css/styles.css';
// import GridLayout from 'react-grid-layout';

// export default class Grid extends React.Component {
//   render() {
//     // layout is an array of objects, see the demo for more complete usage
//     const layout = [
//       {i: 'a', x: 0, y: 0, w: 1, h: 2,},
//       {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
//       {i: 'c', x: 3, y: 0, w: 1, h: 2},
//       {i: 'd', x: 0, y: 0, w: 1, h: 2},
//       {i: 'e', x: 2, y: 0, w: 1, h: 2},
//       {i: 'f', x: 4, y: 0, w: 1, h: 2},
//       {i: 'g', x: 13, y: 0, w: 1, h: 2},
//       {i: 'h', x: 4, y: 0, w: 1, h: 2},
//     ];
//     return (
//       <GridLayout className="layout" layout={layout} cols={12} rowHeight={60} width={1700}>
//         <div key="a">Temperature</div>
//         <div key="b">User</div>
//         <div key="c">Twitter</div>
//         <div key="d">facebook</div>
//         <div key="e">Actualités</div>
//         <div key="f">c</div>
//         <div key="g">c</div>
//         <div key="h">c</div>

//       </GridLayout>
//     )
//   }
// }
