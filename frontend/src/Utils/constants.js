export const FilterCriteria = [
  { value: "contains" },
  { value: "equals" },
  { value: "starts with" },
  { value: "ends with" },
  { value: "is empty" },
];
export const FilterCriteriaNumber = [
  { value: "greater than" },
  { value: "less than" },
  { value: "equals" },
];
export const numericColumns = [
  "AccelSec",
  "TopSpeed_KmH",
  "Range_Km",
  "Efficiency_Whkm",
  "Fastcharge_KmH",
  "PriceEuro",
];
export const urlConstruct = {
  method: {
    main: "api/v1/bmw",
  },
  endpoints: {
    pagination: "/pagination",
    keys: "/keys",
    search: "/search",
    gridFilter: "/gridFilter",
  },
};
