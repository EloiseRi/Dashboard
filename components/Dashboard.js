import Widget from "./Widget";

const Dashboard = ({ widgets, handleClick }) => {

  return (
    <div className="my-20 text-center">
      <h1 className="mb-4">Octoboard Project</h1>
      <div>
        {" "}
        {widgets.map((w, index) => (
          <Widget key={index} params={w} />
        ))}{" "}
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