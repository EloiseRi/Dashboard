import { useState, useEffect } from "react";

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
    window.location.reload();
  };
  const handleChange = async (e) => setSymbol(e.target.value);

  useEffect(() => {
    find();
  }, []);

  return (
    <>
      <div>
        <h2>Search Crypto Currency Data</h2>
        <div>
          <input
            type="text"
            placeholder={defaultPair}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>
      {/*  */}
      {(error && <h1>{error}</h1>) ||
        (data && (
          <div>
            {Object.keys(data).map((dataKey, i) => (
              <div key={`${dataKey}-${i}`}>
                <h3>
                  {Array.isArray(data[dataKey])
                    ? data[dataKey][0]
                    : data[dataKey]}
                </h3>
                <p>{KRAKEN_DATA_LABELS[dataKey]}</p>
              </div>
            ))}
          </div>
        ))}
    </>
  );
};

export default Crypto;