import { useState, useEffect } from "react";

const Spotify = () => {
  const [update, setUpdate] = useState(false);
  const addWidget = async () => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "spotify",
        auth_required: false,
      }),
    });
    setUpdate(!update);
  };

  useEffect(() => {}, [update]);

  return (
    <div className="text-center">
      <h1 className="text-xl">Spotify</h1>
      <button onClick={() => addWidget()}>Create Widget</button>
    </div>
  );
};

export default Spotify;
