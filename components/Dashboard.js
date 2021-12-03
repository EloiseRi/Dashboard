import Weather from "./widgets/Weather";
import Clock from "./widgets/Clock";
import Crypto from "./widgets/Crypto";
import Movies from "./widgets/Movies";
// import Spotify from "./widgets/Spotify";
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Dashboard = ({ widgets }) => {
  const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2,},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: 'c', x: 3, y: 0, w: 1, h: 2},
    {i: 'd', x: 0, y: 0, w: 1, h: 2},
    {i: 'e', x: 2, y: 0, w: 1, h: 2},
    {i: 'f', x: 4, y: 0, w: 1, h: 2},
    {i: 'g', x: 13, y: 0, w: 1, h: 2},
    {i: 'h', x: 4, y: 0, w: 1, h: 2},
  ];
  return (
    <div className="my-20 text-center">
      <h1 className="mb-4">Octoboard Project</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {" "}
        {widgets.map((widget, index) => {
          if (widget.api_name == 'weather') return <Weather key={index} params={widget} />
          if (widget.api_name == 'clock') return <Clock key={index} params={widget} />
          if (widget.api_name == 'crypto') return <Crypto key={index} params={widget} />
          if (widget.api_name == 'movies') return <Movies key={index} params={widget} />
          {/* if (widget.api_name == 'spotify') return <Spotify key={index} params={widget} /> */}
        })}{" "}
      </div>
    </div>
  );
};

export default Dashboard;