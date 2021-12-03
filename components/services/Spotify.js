import { useState, useEffect } from "react";

const Spotify = (props) => {
  const addWidget = async () => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "spotify",
        auth_required: false,
      }),
    });
  };

  useEffect(() => {}, []);

  const handleClick = () => {
    addWidget();
    props.toggleModal();
    props.resetServiceType(null);
  }

  return (
    <div className="text-center">
      <h1 className="text-xl">Spotify</h1>
      <button onClick={handleClick}>Create Widget</button>
    </div>
  );
};

export default Spotify;
