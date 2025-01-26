import React, { useState } from "react";
import { Button, FormControl } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { FilterCriteria } from "../../Utils/constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CustomButton from "../Button/Button";
import "./SideBar.css";

const SideBar = ({ column, isOpen, toggleSideBar }) => {
  const [FilteringCriteria, setFilteringCriteria] = useState("");
  const [FilteringColumn, setFilteringColumn] = useState("");

  const handleFilterColumn = (event) => {
    setFilteringColumn(event.target.value);
  };

  const handleFilterCriteria = (event) => {
    setFilteringCriteria(event.target.value);
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
          <FormControl
            className="column-selector"
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            size="small"
          >
            <InputLabel id="custom-input-label">Column</InputLabel>
            <Select
              className="column-selectior"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={FilteringColumn}
              label="Column"
              onChange={handleFilterColumn}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {column.map((item, index) => (
                <MenuItem key={index} value={item.field}>
                  {item.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            className="column-selector"
          >
            <InputLabel id="demo-simple-select-label">Criteria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={FilteringCriteria}
              label="Criteria"
              onChange={handleFilterCriteria}
            >
              {FilterCriteria.map((item, index) => (
                <MenuItem key={index} value={item?.value}>
                  {item?.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ height: "20px" }}></div>
          <CustomButton>Apply Filter</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
