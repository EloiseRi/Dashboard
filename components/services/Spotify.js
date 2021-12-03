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
      <h1 className="mb-2 text-3xl text-black">Spotify</h1>
      <button className="mx-auto my-8 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => addWidget()}>Create Widget</button>
    </div>
  );
};

export default Spotify;
