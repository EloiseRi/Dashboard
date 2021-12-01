import { useState } from "react";

const Crypto = () => {
  const [pair, setPair] = useState("ETHUSD");

  const addWidget = async (pair) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "crypto",
        auth_required: false,
        params: { pair: pair },
      }),
    });
    window.location.reload();
  };

  return (
    <div className="text-center">
      <h1 className="text-xl">Crypto Market</h1>
      <label>Default pair :</label>
      <input
        type="text"
        placeholder="ETHUSD"
        onChange={(e) => setPair(e.target.value)}
      />
      <button onClick={() => addWidget(pair)}>
        Create Widget
      </button>
    </div>
  );
};

export default Crypto;
