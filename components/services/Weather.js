import { useState, useEffect } from "react";

const Weather = (props) => {
  const [city, setCity] = useState("Nice");

  const addWidget = async (city, type) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "weather",
        auth_required: false,
        params: { city: city, type: type },
      }),
    });
  };

  useEffect(() => {}, []);

  const handleClick = (widgetType) => {
    addWidget(city, widgetType);
    props.refreshData();
    props.toggleModal();
    props.resetServiceType(null);
  }

  return (
    <div className="text-center">
      <h1 className="text-xl">Weather</h1>
      <input
        type="text"
        placeholder="Nice"
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="mt-12 grid grid-cols-2 gap-4">
        <button onClick={() => handleClick('daily')}>Daily</button>
        <button onClick={() => handleClick('weekly')}>Weekly</button>
      </div>
    </div>
  );
};

export default Weather;
