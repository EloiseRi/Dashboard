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
  };

  useEffect(() => {}, [update]);

  return (
    <div className="text-center">
      <h1 className="mb-2 text-3xl text-black">The Movie DB</h1>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => addWidget("popular")}>Popular Movies</button>
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => addWidget("top_rated")}>Top Rated Movies</button>
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => addWidget("now_playing")}>In Theaters Now</button>
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => addWidget("upcoming")}>Upcoming Movies</button>
      </div>
    </div>
  );
};

export default Movies;
