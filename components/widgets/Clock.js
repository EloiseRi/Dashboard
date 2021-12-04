import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment-timezone";

import { faSync } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WClock = (props) => {
  let currentParams = props.params.params;
  let widgetId = props.params._id;
  const [data, setData] = useState([]);
  const [value, setValue] = useState(new Date());
  const [error, setError] = useState(null);
  const [country, setCountry] = useState(currentParams.country);
  const [continent, setContinent] = useState(currentParams.continent);

  const fetchTimezone = async () => {
    try {
      let timezone = continent + "/" + country;
      let response = await fetch(
        `http://worldtimeapi.org/api/timezone/${timezone}`
      );
      let data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  useEffect(() => {
    fetchTimezone();
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = async (e) => {
    props.deleteWidget(widgetId);
  };

  const handleChangeContinent = async (e) => setContinent(e.target.value);
  const handleChangeCountry = async (e) => setCountry(e.target.value);

  const handleSubmit = async () => {
    await fetch("/api/widgets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        req_type: "CLOCK",
        _id: widgetId,
        params: { continent: continent, country: country },
      }),
    });
    await fetchTimezone();
  };

  return (
    <div>
      <div className="flex flex-col justify-center py-12">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl p-8 bg-clip-padding bg-opacity-60 border border-gray-100">
            <button className="absolute left-4 top-2 text-black hover:text-red-600">
              <FontAwesomeIcon
                className="h-3"
                icon={faTrashAlt}
                onClick={handleClick}
              ></FontAwesomeIcon>
            </button>
            <div className="mb-4">
              {" "}
              {moment.tz(data.timezone).format("LTS")}
            </div>
            <Clock value={moment.tz(data.timezone).format("LTS")} />
            <div className="mt-4">{data.timezone}</div>
          </div>
        </div>
        <div className="relative pt-2">
          <input
            type="text"
            className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
            placeholder={continent}
            onChange={handleChangeContinent}
          />
          <input
            type="text"
            className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
            placeholder={country}
            onChange={handleChangeCountry}
          />
          <div className="absolute top-2 right-0">
            {" "}
            <button
              className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon className="h-3" icon={faSync}></FontAwesomeIcon>
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WClock;
