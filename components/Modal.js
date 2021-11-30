import Modal from "react-modal";
import { useState } from "react";
import Weather from "./Weather";

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
            <div onClick={() => setType("fbi")} className="border-2">
              Most Wanted - FBI
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
          {type == "clock" && <div>Clock</div>}
          {type == "crypto" && <div>Crypto Market</div>}
          {type == "fbi" && <div>Most Wanted - FBI</div>}
          {type == "spotify" && <div>Spotify</div>}
        </div>
      )}
    </Modal>
  );
};

export default WidgetModal;
