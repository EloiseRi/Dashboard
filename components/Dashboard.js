import Weather from "./widgets/Weather";
import Clock from "./widgets/Clock";
import Crypto from "./widgets/Crypto";
import Movies from "./widgets/Movies";

const Dashboard = ({ widgets }) => {

  return (
    <div className="my-20 text-center">
      <h1 className="mb-4">Octoboard Project</h1>
      <div>
        {" "}
        {widgets.map((widget, index) => {
          if (widget.api_name == 'weather') return <Weather key={index} params={widget} />
          if (widget.api_name == 'clock') return <Clock key={index} params={widget} />
          if (widget.api_name == 'crypto') return <Crypto key={index} params={widget} />
          if (widget.api_name == 'movies') return <Movies key={index} params={widget} />
        })}{" "}
      </div>
    </div>
  );
};

export default Dashboard;