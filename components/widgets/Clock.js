import { useEffect, useState } from "react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import moment from 'moment-timezone'

const WClock = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(new Date());
  let currentParams = props.params.params;

  useEffect((continent, country) => {
    const fetchTimezone = async (continent, country) => {
      let timezone = continent + "/" + country;
      let response = await fetch(
        `http://worldtimeapi.org/api/timezone/${timezone}`
      );
      let data = await response.json();
      setData(data);
      console.log(data)
    };
    fetchTimezone(currentParams.continent, currentParams.country);
    const interval = setInterval(
      () => setValue(new Date()),
      1000
    );
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center py-12">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl p-8 bg-clip-padding bg-opacity-60 border border-gray-100">
            <div className="mb-4"> {moment.tz(data.timezone).format('LTS')}</div>
            <Clock value={moment.tz(data.timezone).format('LTS')} />
            <div className="mt-4">{data.timezone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WClock;
