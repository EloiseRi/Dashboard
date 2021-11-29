import Widget from './Widget';

const Dashboard = (widgets) => {
  return (
    <div className="my-20 text-center">
      <h1 className="mb-4">Octoboard Project</h1>
      <div> {widgets.widgets.map((w, index) => (
        <Widget key={index} params={w} />
      )
      )} </div>
    </div>
  );
};

export default Dashboard;