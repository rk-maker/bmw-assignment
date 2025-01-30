import React, { useState } from "react";
import { Button, createFilterOptions, FormControl } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  FilterCriteria,
  numericColumns,
  FilterCriteriaNumber,
} from "../../Utils/constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CustomButton from "../Button/Button";
import "./SideBar.css";
import StyledInput from "../TextInput/TextInput";
import FilterIcon from "@mui/icons-material/FilterList";

import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)({
  "& .MuiInputLabel-root": {
    color: "#ffffff",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#035b74",
  },
  "& .MuiSelect-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#595c5e",
    },
    "&:hover fieldset": {
      borderColor: "#306c83",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#035b74",
    },
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
});
const SideBar = ({ column, isOpen, toggleSideBar, applyFilter }) => {
  const [filteringCriteria, setFilteringCriteria] = useState("");
  const [filteringColumn, setFilteringColumn] = useState("");
  const [filteringValue, setFilteringValue] = useState("");

  const handleFilterColumn = (event) => {
    setFilteringColumn(event.target.value);
    setFilteringCriteria([]);
  };

  const handleFilterCriteria = (event) => {
    setFilteringCriteria(event.target.value);
  };
  const crteriaOptions = numericColumns.includes(filteringColumn)
    ? FilterCriteriaNumber
    : FilterCriteria;
  const valueInputType = numericColumns.includes(filteringColumn)
    ? "number"
    : "text";
  const handleApplyFilters = () => {
    if (!filteringColumn || !filteringCriteria || !filteringValue) {
      alert(
        "You must select both a column , a criteria and a value  before applying the filter!"
      );
      return;
    }

    applyFilter({
      column: filteringColumn,
      criteria: filteringCriteria,
      value: filteringValue,
    }); // Return values to parent
    setFilteringValue("");
    setFilteringCriteria([]);
    setFilteringColumn([]);

    toggleSideBar(); // Close sidebar after applying filter
  };
  return (
    <div>
      <div
        id="overlay"
        className={isOpen ? "visible" : ""}
        onClick={toggleSideBar}
      ></div>
      <div id="sidebar" className={isOpen ? "open" : ""}>
        <div className="sidebar-header">
          <h2>Filter</h2>
          <Button onClick={toggleSideBar} className="close-btn">
            <CancelIcon style={{ color: "white" }} />
          </Button>
        </div>
        <div className="sidebar-content">
          <StyledFormControl
            className="column-selector"
            variant="standard"
            sx={{ m: 1, minWidth: 250 }}
            size="small"
          >
            <InputLabel id="custom-input-label">Column</InputLabel>
            <Select
              className="column-selectior"
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              value={filteringColumn}
              label="Column"
              onChange={handleFilterColumn}
            >
              {column.map((item, index) => (
                <MenuItem key={index} value={item.field}>
                  {item.headerName}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <StyledFormControl
            variant="standard"
            sx={{ m: 1, minWidth: 250 }}
            className="column-selector"
            disabled={!filteringColumn}
          >
            <InputLabel id="demo-simple-select-label">Criteria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filteringCriteria}
              label="Criteria"
              onChange={handleFilterCriteria}
            >
              {crteriaOptions.map((item, index) => (
                <MenuItem key={index} value={item?.value}>
                  {item?.value}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <div style={{ height: "20px" }}></div>

          <StyledInput
            label="Filter"
            placeholder="Enter Value ..."
            value={filteringValue}
            onChange={(e) => {
              setFilteringValue(e.target.value);
              // setSearchInput(e.target.value);
              // setSearchedBMWModels([]);
              // setSearched(false);
            }}
            type={valueInputType}
            // onKeyDown={(e) => () => {
            //   if (e.key === "Escape") {
            //     setOpen(false);
            //     setSearched(false);
            //   }
            // }}
            onIconClick={() => {
              // searchedByiD(searchInput);
              // setSearched(true);
            }}
            icon={<FilterIcon />}
          />
          <div style={{ height: "20px" }}></div>
          <CustomButton onClick={handleApplyFilters}>Apply Filter</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
