import { useState, useEffect } from "react";

const Clock = (props) => {
  const [continent, setContinent] = useState("Europe");
  const [country, setCountry] = useState("Paris");

  const addWidget = async (continent, country) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "clock",
        auth_required: false,
        params: { continent: continent, country: country },
      }),
    });
  };

  useEffect(() => {}, []);

  const handleClick = () => {
    addWidget(continent, country);
    props.toggleModal();
    props.resetServiceType(null);
    props.refreshData();
  };

  return (
    <div className="text-center">
      <h1 className="text-xl">Clock</h1>
      <input
        type="text"
        placeholder="Europe"
        onChange={(e) => setContinent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Paris"
        onChange={(e) => setCountry(e.target.value)}
      />

      <button onClick={handleClick}>
        Create Widget
      </button>
    </div>
  );
};

export default Clock;
