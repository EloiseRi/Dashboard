import Modal from "react-modal";
import { useState } from "react";
import Weather from "./services/Weather";
import Clock from "./services/Clock";
import Crypto from "./services/Crypto";
import Movies from "./services/Movies";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    width: "50%",
    height: "75%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const WidgetModal = (props) => {
  const [type, setType] = useState(null);

  return (
    <Modal isOpen={props.openModal} style={customStyles}>
      {!type && (
        <div className="text-center">
          <button onClick={props.toggleModal}>X</button>
          <h1 className="text-xl">SERVICES</h1>
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div onClick={() => setType("weather")} className="border-2">
              Weather
            </div>
            <div onClick={() => setType("clock")} className="border-2">
              Clock
            </div>
            <div onClick={() => setType("crypto")} className="border-2">
              Crypto Market
            </div>
            <div onClick={() => setType("movies")} className="border-2">
              The Movie DB
            </div>
            <div onClick={() => setType("spotify")} className="border-2">
              Spotify
            </div>
          </div>
        </div>
      )}
      {type && (
        <div>
          <button onClick={() => setType(null)}>X</button>
          {type == "weather" && <Weather />}
          {type == "clock" && <Clock />}
          {type == "crypto" && <Crypto />}
          {type == "movies" && <Movies />}
          {type == "spotify" && <div>Spotify</div>}
        </div>
      )}
    </Modal>
  );
};

export default WidgetModal;
