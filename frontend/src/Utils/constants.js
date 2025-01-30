export const FilterCriteria = [
  { value: "contains" },
  { value: "equals" },
  { value: "starts with" },
  { value: "ends with" },
  { value: "is empty" },
];

export const urlConstruct = {
  method: {
    main: "api/v1/bmw",
  },
  endpoints: {
    pagination: "/pagination",
    keys: "/keys",
    search: "/search",
  },
};
