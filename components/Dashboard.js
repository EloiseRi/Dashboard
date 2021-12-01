import WWeather from "./widgets/WWeather";

const Dashboard = ({ widgets, handleClick }) => {

  return (
    <div class="my-20 text-center">
      <h1 class ="mb-4">Octoboard Project</h1>
      <div>
        {" "}
        {widgets.map((w, index) => {
          if (w.api_name == 'weather') return <WWeather key={index} params={w} />
        })}{" "}
      </div>

      <button
        onClick={(e) => {
          handleClick()
        }}
      >
        Add Widget
      </button>
    </div>
  );
};

export default Dashboard;