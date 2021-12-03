import { useState, useEffect } from "react";

const Movies = (props) => {
  const addWidget = async (type) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "movies",
        auth_required: false,
        params: { type: type },
      }),
    });
  };

  useEffect(() => {}, []);

  const handleClick = (type) => {
    addWidget(type);
    props.toggleModal();
    props.resetServiceType(null);
  }

  return (
    <div className="text-center">
      <h1 className="text-xl">The Movie DB</h1>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <button onClick={() => handleClick('popular')}>Popular Movies</button>
        <button onClick={() => handleClick('top_rated')}>Top Rated Movies</button>
        <button onClick={() => handleClick('now_playing')}>In Theaters Now</button>
        <button onClick={() => handleClick('upcoming')}>Upcoming Movies</button>
      </div>
    </div>
  );
};

export default Movies;
