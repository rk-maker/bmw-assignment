import React, { useState } from "react";
import { FilterCriteria } from "../Utils/constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const FilterData = ({ column }) => {
  const [FilteringCriteria, setFilteringCriteria] = useState("");
  const [FilteringColumn, setFilteringColumn] = useState("");
  //for handling the filterColumn
  const handleFilterColumn = (event) => {
    setFilteringColumn(event.target.value);
  };
  //for handling the filter Criteria
  const handleFilterCriteria = (event) => {
    setFilteringCriteria(event.target.value);
  };
  return (
    <div>
      <InputLabel id="demo-simple-select-label">Column</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={FilteringColumn}
        label="Age"
        onChange={handleFilterColumn}
      >
        {column.map((item, index) => (
          <MenuItem key={index} value={item.field}>
            {item.headerName}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="demo-simple-select-label">Criteria</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={FilteringCriteria}
        label="Age"
        onChange={handleFilterCriteria}
      >
        {FilterCriteria.map((item, index) => (
          <MenuItem key={index} value={item?.value}>
            {item?.value}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default FilterData;
