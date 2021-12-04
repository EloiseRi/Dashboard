import { useEffect } from "react";
import Weather from "./widgets/Weather";
import Clock from "./widgets/Clock";
import Crypto from "./widgets/Crypto";
import Movies from "./widgets/Movies";
import Spotify from "./widgets/Spotify";

const Dashboard = ({ widgets, refreshData }) => {
  const deleteWidget = async (widgetId) => {
    await fetch("api/widgets/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: widgetId,
      }),
    });
    refreshData();
  };

  useEffect(() => {}, []);

  return (
    <div className="my-20 text-center">
      <h1 className="mb-4">Octoboard Project</h1>
      <div>
        {" "}
        {widgets.map((widget, index) => {
          if (widget.api_name == "weather")
            return (
              <Weather
                key={index}
                params={widget}
                deleteWidget={deleteWidget}
              />
            );
          if (widget.api_name == "clock")
            return (
              <Clock key={index} params={widget} deleteWidget={deleteWidget} />
            );
          if (widget.api_name == "crypto")
            return (
              <Crypto key={index} params={widget} deleteWidget={deleteWidget} />
            );
          if (widget.api_name == "movies")
            return (
              <Movies key={index} params={widget} deleteWidget={deleteWidget} />
            );
          if (widget.api_name == "spotify")
            return (
              <Spotify
                key={index}
                params={widget}
                deleteWidget={deleteWidget}
              />
            );
        })}{" "}
      </div>
      <button onClick={() => refreshData()}>Refresh</button>
    </div>
  );
};

export default Dashboard;
