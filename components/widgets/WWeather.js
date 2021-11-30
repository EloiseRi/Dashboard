import { useEffect, useState } from "react";

const WWeather = (props) => {
  const [data, setData] = useState({});
  let currentParams = props.params.params;

  useEffect((type, city) => {
    const fetchWeather = async (type, city) => {
      if (type == "daily") {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weatherKey}`
        );
        const data = await response.json();
        setData(data)
      }
      if (type == "weekly") {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.weatherKey}`
        );
        let data = await response.json();
        setData(data)
      }
    };
    fetchWeather(currentParams.type, currentParams.city);
  }, []);

  return <div>salut</div>;
};

export default WWeather;
