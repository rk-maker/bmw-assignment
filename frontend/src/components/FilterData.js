import React, { useState } from "react";
import { FilterCriteria } from "../Utils/constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";

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
  const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: 4,
    backgroundColor: "#F3F6F9",
    border: "1px solid #E0E3E7",
    fontSize: 16,
    padding: "10px 12px",
    "&:hover": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused": {
      borderColor: "#6F7E8C",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
  }));
  return (
    <div>
      <InputLabel id="demo-simple-select-label">Column</InputLabel>
      <StyledSelect
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
      </StyledSelect>
      <InputLabel id="demo-simple-select-label">Criteria</InputLabel>
      <StyledSelect
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
      </StyledSelect>
    </div>
  );
};

export default FilterData;
