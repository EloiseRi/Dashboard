import { useEffect, useState } from "react";
import moment from 'moment';
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.weatherKey}`
          );
          let result = await response.json();
          setData(result);
          console.log(result)
          return;
        }
        if (type == "weekly") {
          let response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.weatherKey}`
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
  const [displayDataW, setDisplayDataW] = useState({
    icon: '', city: '', tempDay1: '', tempDay2: '', tempDay3: '', tempDay4: '', tempDay5: '',
    weather: '', humidity: '',
    dateDay1: '', dateDay2: '', dateDay3: '', dateDay4: '', dateDay5: '',
    day: '',
    iconDay1: '', iconDay2: '', iconDay3: '', iconDay4: '', iconDay5: '',
  })
  console.log(data)
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
    if (currentParams.type == 'daily' && data != null) {
      setDisplayDataD({ icon: data.weather[0].icon, city: data.name, temp: data.main.temp, weather: data.weather[0].main, humidity: data.main.humidity, date: moment().format('dddd'), day: moment().format('LL') })
    }
    if (currentParams.type == 'weekly' && data != null) {
      setDisplayDataW({
        icon: data.list[1].weather[0].icon, city: data.city.name,
        tempDay1: data.list[3].main.temp, tempDay2: data.list[11].main.temp, tempDay3: data.list[19].main.temp, tempDay4: data.list[27].main.temp, tempDay5: data.list[35].main.temp,
        weather: data.list[1].weather[0].main, humidity: data.list[0].main.humidity,
        dateDay1: data.list[3].dt_txt, dateDay2: data.list[11].dt_txt, dateDay3: data.list[19].dt_txt, dateDay4: data.list[27].dt_txt, dateDay5: data.list[35].dt_txt,
        iconDay1: data.list[3].weather[0].icon, iconDay2: data.list[11].weather[0].icon, iconDay3: data.list[19].weather[0].icon, iconDay4: data.list[27].weather[0].icon, iconDay5: data.list[35].weather[0].icon,
        day: moment().format('LL')
      })
      // setWeekly(data.list)
    }
  }, [update, displayDataD, displayDataW]);

  return (
    <div className="container mx-auto">
      <div>
        {currentParams.type == "daily" && (
          <div className="flex flex-col justify-center py-12">
            <div className="relative max-w-xl mx-auto">
              <div className="relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
                <div className="text-2xl text-purple-800">{displayDataD.date}</div>
                <img className="ml-auto h-28" src={`http://openweathermap.org/img/w/${displayDataD.icon}.png`} />
                <div className="text-4xl mt-2 mb-5">{Math.round(displayDataD.temp)}&deg;C</div>
                <div className="text-2xl">{displayDataD.city}</div>
                <div className="m-0 italic">{displayDataD.weather}</div>
                <div className="ml-auto flex flex-row text-xs">
                  <svg className="h-3.5" viewBox="0 0 64 64"
                    fill="none"
                    stroke="#202020"
                    stroke-miterlimit="10"
                    stroke-width="2">
                    <path d="M51.9 40.1a20.6 20.6 0 0 0-1-4.9C46.9 20.8 32 2 32 2S17.1 20.8 13 35.2a20.6 20.6 0 0 0-1 4.9c0 .5-.1 1-.1 1.5A20.2 20.2 0 0 0 32 62a20.2 20.2 0 0 0 20-20.4c0-.5 0-1-.1-1.5z" />
                    <path data-name="layer1" fill="none" stroke="#202020" stroke-miterlimit="10"
                      stroke-width="2" d="M38 30L26 50" />
                    <circle data-name="layer1" cx="26" cy="32" r="4" fill="none" stroke="#202020"
                      stroke-miterlimit="10" stroke-width="2" />
                    <circle data-name="layer1" cx="38" cy="48" r="4" fill="none"
                      stroke="#202020" stroke-miterlimit="10" stroke-width="2" />
                  </svg>
                  <div>{displayDataD.humidity}%</div></div>
                <div class="relative pt-2">
                  <input type="text" className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none" placeholder={city} onChange={handleChange} />
                  <div class="absolute top-2 right-0"> <button className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500" onClick={handleSubmit}><FontAwesomeIcon className="h-3" icon={faSync}></FontAwesomeIcon></button> </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {currentParams.type == "weekly" && (
          <div className="py-12">
            <div className="relative max-w-xl mx-auto">
              <div className="relative flex flex-col relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
                <div className="text-2xl mb-2">{displayDataW.city}</div>
                <div className="m-0 italic text-ms mb-4">{displayDataW.weather}</div>
                <img className="absolute mx-auto right-6 top-0 h-24" src={`http://openweathermap.org/img/w/${displayDataW.iconDay1}.png`} />
                <div className="flex flex-row ">
                  <div className="flex-col">
                    <div className="text-purple-800">{displayDataW.dateDay1}</div>
                    <div>{Math.round(displayDataW.tempDay1)}&deg;C</div>
                    <img className="mx-auto" src={`http://openweathermap.org/img/w/${displayDataW.iconDay1}.png`} />
                  </div>
                  <div className="flex-col">
                    <div className="text-purple-800">{displayDataW.dateDay2}</div>
                    <div>{Math.round(displayDataW.tempDay2)}&deg;C</div>
                    <img className="mx-auto" src={`http://openweathermap.org/img/w/${displayDataW.iconDay2}.png`} />
                  </div>
                  <div className="flex-col">
                    <div className="text-purple-800">{displayDataW.dateDay3}</div>
                    <div>{Math.round(displayDataW.tempDay3)}&deg;C</div>
                    <img className="mx-auto" src={`http://openweathermap.org/img/w/${displayDataW.iconDay3}.png`} />
                  </div>
                  <div className="flex-col">
                    <div className="text-purple-800">{displayDataW.dateDay4}</div>
                    <div>{Math.round(displayDataW.tempDay4)}&deg;C</div>
                    <img className="mx-auto" src={`http://openweathermap.org/img/w/${displayDataW.iconDay4}.png`} />
                  </div>
                  <div className="flex-col">
                    <div className="text-purple-800">{displayDataW.dateDay5}</div>
                    <div>{Math.round(displayDataW.tempDay5)}&deg;C</div>
                    <img className="mx-auto" src={`http://openweathermap.org/img/w/${displayDataW.iconDay5}.png`} />
                  </div>
                </div>
            <div class="relative pt-2 w-52 mx-auto">
                  <input type="text" className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none" placeholder={city} onChange={handleChange} />
                  <div class="absolute top-2 right-0"> <button className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500" onClick={handleSubmit}><FontAwesomeIcon className="h-3" icon={faSync}></FontAwesomeIcon></button> </div>
              </div>
              </div>
            </div>

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

// export default className Grid extends React.Component {
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
//       <GridLayout classNameName="layout" layout={layout} cols={12} rowHeight={60} width={1700}>
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
