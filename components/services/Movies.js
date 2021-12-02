import { useState, useEffect } from "react";

const Movies = () => {
  const [update, setUpdate] = useState(false);
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
    setUpdate(!update);
    // window.location.reload();
  };

  useEffect(() => {}, [update]);

  return (
    <div className="text-center">
      <h1 className="text-xl">The Movie DB</h1>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <button onClick={() => addWidget("popular")}>Popular Movies</button>
        <button onClick={() => addWidget("top_rated")}>Top Rated Movies</button>
        <button onClick={() => addWidget("now_playing")}>In Theaters Now</button>
        <button onClick={() => addWidget("upcoming")}>Upcoming Movies</button>
      </div>
    </div>
  );
};

export default Movies;
