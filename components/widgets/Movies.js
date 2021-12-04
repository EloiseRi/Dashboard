import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const useFindMovies = (props) => {
  const [type, setType] = useState(props);
  const [data, setData] = useState(null);

  return {
    type,
    setType,
    data,
    findMovies: async () => {
      let res = null;
      let result = null;
      try {
        res = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.moviesKey}&language=en-US&page=1`
        );
        result = await res.json();
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

  const handleClick = async (e) => {
    props.deleteWidget(widgetId);
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 1,
    },
  };
  return (
    <div >
      <div className="flex flex-col justify-center py-1 ">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl pb-8 py-6 px-0 bg-clip-padding bg-opacity-60 border border-gray-100 w-72">
            <div className="absolute top-2 right-1"> <button className="pr-2" onClick={handleClick}><FontAwesomeIcon className="h-3" icon={faTrashAlt}></FontAwesomeIcon></button></div>
            <h1 className="text-2xl text-purple-800 mb-4 divide-x divide-green-500">Movies</h1>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              arrows={true}
              ssr={false} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container relative"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-10-px"
            >
              <div>
                <p className="italic mb-1">{data.results[0].title}</p>
                <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`} />
                <p className="mt-4">{data.results[0].vote_average}/10</p>

              </div>
              <div>
                <p className="italic mb-2">{data.results[2].title}</p>
                <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[2].poster_path}`} />
                <p className="mt-4">{data.results[2].vote_average}/10</p>

              </div>
              <div>
                <p className="italic mb-2">{data.results[6].title}</p>

                <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[6].poster_path}`} />
                <p className="mt-4">{data.results[6].vote_average}/10</p>

              </div>
              <div>
                <p className="italic mb-2">{data.results[9].title}</p>
                <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[9].poster_path}`} />
                <p className="mt-4">{data.results[9].vote_average}/10</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
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
                      className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
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
                      className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
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
                      className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
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
                      className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
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
