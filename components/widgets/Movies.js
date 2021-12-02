import { useEffect, useState, useStateCallback, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const useFindMovies = (props) => {
  const [type, setType] = useState(props);
  const [data, setData] = useState(null);

  return {
    type,
    setType,
    data,
    findMovies: async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.moviesKey}&language=en-US&page=1`
        );
        let result = await res.json();
        setData(result);
        return;
      } catch (e) {
        console.error(e);
      }
    },
  };
};

const Movies = (props) => {
  const [update, setUpdate] = useState(false);
  const defaultType = props.params.params.type;
  let widgetId = props.params._id;
  const { findMovies, type, setType, data } = useFindMovies(defaultType);

  const handleChange = async (e) => {
    setType(e.target.value);
    setUpdate(!update);
  };

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/widgets/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          req_type: "MOVIES",
          _id: widgetId,
          type: type,
        }),
      });

      findMovies(type);
    }
    fetchData();
  }, [type]);

  return (
    <div>
      <h1>Movies</h1>
      <div className="w-56 fixed top-20 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Options =
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      value={"popular"}
                      onClick={handleChange}
                    >
                      Popular Movies
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      value={"top_rated"}
                      onClick={handleChange}
                    >
                      Top Rated Movies
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      value={"now_playing"}
                      onClick={handleChange}
                    >
                      In Theaters Now
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      value={"upcoming"}
                      onClick={handleChange}
                    >
                      Upcoming Movies
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Movies;
