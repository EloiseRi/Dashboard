import Modal from "react-modal";
import { useState } from "react";
import Weather from "./services/Weather";
import Clock from "./services/Clock";
import Crypto from "./services/Crypto";
import Movies from "./services/Movies";
import Spotify from "./services/Spotify";


Modal.setAppElement("#__next");

const customStyles = {
  content: {
    width: "35%",
    height: "70%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0%",
    borderRadius: "4%",
    transform: "translate(-50%, -50%)",
  },
};

const WidgetModal = ({ openModal, toggleModal, refreshData }) => {
  const [type, setType] = useState(null);
  // const layout = [
  //   { i: 'a', x: 0, y: 0, w: 2, h: 4, },
  //   { i: 'b', x: 0, y: 2, w: 2, h: 4, },
  //   { i: 'c', x: 0, y: 2, w: 2, h: 4, },
  //   { i: 'd', x: 0, y: 2, w: 2, h: 4, },
  //   { i: 'e', x: 0, y: 2, w: 2, h: 4, },
  //   { i: 'f', x: 0, y: 2, w: 2, h: 4, },

  // ];
  return (
    <Modal isOpen={openModal} style={customStyles}>
      {!type && (
        <div className="sm:h-full bg-purple-50 rounded-2xl text-center p-4 pt-7">
          <div className="w-20 flex flex-row text-left text-purple-400">
            <button onClick={toggleModal}>X</button>
          </div>
          <h1 className="text-2xl mb-2">SERVICES</h1>
          <div className=" mt-8 ml-10 mr-10 grid grid-cols-3 gap-3">
            <div onClick={() => setType("weather")} className="py-20 rounded-xl border-2 border-gray-500 hover:bg-purple-200">
              Weather
            </div>
            <div onClick={() => setType("clock")} className="py-20 rounded-xl border-2 border-gray-500 hover:bg-purple-200">
              Clock
            </div>
            <div onClick={() => setType("crypto")} className="py-20 rounded-xl border-2 border-gray-500 hover:bg-purple-200">
              Crypto Market
            </div>
            <div onClick={() => setType("movies")} className="py-20 rounded-xl border-2 border-gray-500 hover:bg-purple-200">
              The Movie DB
            </div>
            <div onClick={() => setType("spotify")} className="py-20 rounded-xl border-2 border-gray-500 hover:bg-purple-200">
              Spotify
            </div>
          </div>
        </div>
      )}
      {type && (
        // <GridLayout classNameName="layout" layout={layout} cols={8} rowHeight={30} width={1700}>

        <div className="sm:h-full bg-purple-50 rounded-2xl text-center p-4 pt-7">
          <div className="w-20 flex flex-row text-left text-purple-400 p-8">
            <button onClick={() => setType(null)}>X</button>
          </div>
          {type == "weather" && (
            <Weather toggleModal={toggleModal} resetServiceType={setType} refreshData={refreshData} />
          )}
          {type == "clock" && (
            <Clock toggleModal={toggleModal} resetServiceType={setType} refreshData={refreshData} />
          )}
          {type == "crypto" && (
            <Crypto toggleModal={toggleModal} resetServiceType={setType} refreshData={refreshData} />
          )}
          {type == "movies" && (
            <Movies toggleModal={toggleModal} resetServiceType={setType} refreshData={refreshData} />
          )}
          {type == "spotify" && (
            <Spotify toggleModal={toggleModal} resetServiceType={setType} refreshData={refreshData} />
          )}
          <div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default WidgetModal;
