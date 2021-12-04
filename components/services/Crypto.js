import { useState, useEffect } from "react";

const Crypto = (props) => {
  const [pair, setPair] = useState("ETHUSD");
  const [refreshRate, setRefreshRate] = useState(10000)

  const addWidget = async (pair) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "crypto",
        auth_required: false,
        params: { pair: pair, refreshRate: refreshRate },
      }),
    });
  };

  useEffect(() => {}, []);

  const handleClick = () => {
    addWidget(pair)
    props.toggleModal()
    props.resetServiceType(null);
    props.refreshData();
  }

  return (
    <div className="text-center">
      <h1 className="text-xl">Crypto Market</h1>
      <label>Default pair :</label>
      <input
        type="text"
        placeholder="ETHUSD"
        onChange={(e) => setPair(e.target.value)}
      />
      <label>Refresh Rate (ms) :</label>
      <input
        type="text"
        placeholder="10000"
        onChange={(e) => setRefreshRate(e.target.value)}
      />
      <button onClick={handleClick}>
        Create Widget
      </button>
    </div>
  );
};

export default Crypto;
