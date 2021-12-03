import { useEffect, useState } from "react";

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

  const handleChange = async (e) => setCity(e.target.value);
  const handleSubmit = async () => {
    fetchWeather();
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
    fetchWeather();
  }, [update]);

  return (
    <div>
      <h1>Weather</h1>
      <input type="text" placeholder={city} onChange={handleChange} />
      <button onClick={handleSubmit}>Update city</button>
    </div>
  );
};

export default Weather;
