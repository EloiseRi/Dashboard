const Widget = (params) => {
  let parameters = params.params;

  return (
    <div>
      <h1>{parameters.api_name}</h1>
    </div>
  );
};

export default Widget;
