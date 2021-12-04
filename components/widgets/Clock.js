import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment-timezone";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WClock = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(new Date());
  const [error, setError] = useState(null);
  let currentParams = props.params.params;
  let widgetId = props.params._id;

  useEffect(() => {
    const fetchTimezone = async (continent, country) => {
      try {
        let timezone = continent + "/" + country;
        let response = await fetch(
          `http://worldtimeapi.org/api/timezone/${timezone}`
        );
        let data = await response.json();
        setData(data);
      } catch(e) {
        console.error(e);
        setError(e);
      }
    };
    fetchTimezone(currentParams.continent, currentParams.country);
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = async (e) => {
    props.deleteWidget(widgetId);
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
      </div>
    </div>
  );
};

export default WClock;
