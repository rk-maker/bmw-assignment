const constants = {
  errorMessages: {
    connectionError: "ConnectionError",
    genralError: "Unable to prcess at this time",
    unableToFetchModels: "Unable to fetch Products",
    requiredParameter: "Required Parameters are not provided",
  },
  succesMessages: {
    modelAddition: "Model Added Succesfully",
  },
  method: "api",
  version: "v1",
  bmw: "bmw",
  endpoints: {
    models: "/models",
    pagination: "/pagination",
    search: "/search",
    keys: "/keys",
    gridFilter: "/gridFilter",
  },
};
module.exports = constants;
