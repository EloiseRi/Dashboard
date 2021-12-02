import { useEffect, useState } from "react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import moment from 'moment';

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
      console.log(data.utc_datetime + data.utc_offset),
      console.log(Date()),
      1000
    );
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <h1>CLOCK</h1>
      <div class="flex flex-col justify-center py-12">
        <div class="relative max-w-xl mx-auto">
          <div class="relative bg-white shadow-lg rounded-3xl p-8 bg-clip-padding bg-opacity-70 border border-gray-100">
            <div class="mb-4">{moment().format('LTS')}</div>
            <Clock value={value} />
            <div class="mt-4">{data.timezone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WClock;
