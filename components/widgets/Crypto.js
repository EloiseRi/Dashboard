import { useState, useEffect } from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const KRAKEN_DATA_LABELS = Object.freeze({
  a: "Ask",
  b: "Bid",
  c: "Last Trade Closed",
  v: "Volume",
  l: "Low",
  h: "High",
  o: "Today Opening Price",
});

const useFindTicker = (pair) => {
  const [symbol, setSymbol] = useState(pair);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return {
    symbol,
    setSymbol,
    data,
    error,
    find: async () => {
      try {
        if (symbol.trim().length < 1) {
          console.log("Symbol is empty");
          return;
        }

        const res = await fetch(
          `https://api.kraken.com/0/public/Ticker?pair=${symbol.trim()}`
        );
        const { error, result } = await res.json();

        if (error.length > 0) {
          setError(error);
          return;
        }

        setData(
          Object.keys(result).reduce(
            (pv, cv) => ({
              ...result[cv],
            }),
            {}
          )
        );
        return;
      } catch (e) {
        console.error(e);
      }
    },
  };
};

const Crypto = (props) => {
  const [update, setUpdate] = useState(false);
  let defaultPair = props.params.params.pair;
  let widgetId = props.params._id;
  const { find, symbol, setSymbol, data, error } = useFindTicker(defaultPair);

  const handleSubmit = async () => {
    find();
    await fetch("/api/widgets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        req_type: 'CRYPTO',
        _id: widgetId,
        pair: symbol
      }),
    });
    setUpdate(!update);
  };
  const handleChange = async (e) => setSymbol(e.target.value);

  useEffect(() => {
    find();
  }, [update]);

  return (
    <>
      <div>
        <div className="flex flex-col justify-center py-12">
          <div className="relative max-w-xl mx-auto">
            <div className="relative bg-white shadow-lg rounded-3xl py-6 px-4 bg-clip-padding bg-opacity-60 border border-gray-100">
              <h2 className="text-purple-800 text-xl mb-2">Search Crypto Currency Data</h2>
              <div className="relative pt-2">
                <input className="h-8 w-60 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
                  type="text"
                  placeholder={defaultPair}
                  onChange={handleChange}
                />
                <div className="absolute top-3 right-1"> <button className="pr-2" onClick={handleSubmit}><FontAwesomeIcon className="h-4 text-gray-400 hover:text-purple-400" icon={faSearch}></FontAwesomeIcon></button></div>
              </div>
              {/*  */}
              {(error && <h1>{error}</h1>) ||
                (data && (
                  <div className="w-56 mx-auto border border-gray-500 rounded-xl bg-gray-200 divide-y divide-gray-400 mt-6">
                    {Object.keys(data).map((dataKey, i) => (
                      <div className="" key={`${dataKey}-${i}`}>
                          <p className="text-purple-500"
                          >{KRAKEN_DATA_LABELS[dataKey]}</p>
                        <h3 className="text-gray-500">
                          {Array.isArray(data[dataKey])
                            ? data[dataKey][0]
                            : data[dataKey]}
                        </h3>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Crypto;