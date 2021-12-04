import { useEffect, useState } from "react";

const Clock = (props) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  let currentParams = props.params.params;

  useEffect((continent, country) => {
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
  }, []);

  return (
    <div>
      <h1>Clock</h1>
    </div>
  );
};

export default Clock;
