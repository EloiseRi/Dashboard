import { useEffect, useState } from "react";

const Clock = (props) => {
  const [data, setData] = useState({});
  let currentParams = props.params.params;

  useEffect((continent, country) => {
    const fetchTimezone = async (continent, country) => {
      let timezone = continent + "/" + country;
      let response = await fetch(
        `http://worldtimeapi.org/api/timezone/${timezone}`
      );
      let data = await response.json();
      setData(data);
    };
    fetchTimezone(currentParams.continent, currentParams.country);
  }, []);

  return (
    <div>
      <h1>Clock</h1>
    </div>
  );
};

export default Clock;
