import { themeQuartz } from "ag-grid-community";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { useNavigate } from "react-router-dom";
import { setDetails } from "../redux/slices";
import { FilterCriteria } from "../Utils/constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  ClientSideRowModelModule,
  NumberEditorModule,
  NumberFilterModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
  PaginationModule,
} from "ag-grid-community";
import {
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  SideBarModule,
} from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  TextEditorModule,
  TextFilterModule,
  PaginationModule,
  NumberFilterModule,
  NumberEditorModule,
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  ValidationModule,
  AllCommunityModule,
]);

const AGDataGrid = ({
  column,
  row,
  totalPages,
  currentPage,
  onPressPreviousPage,
  onPressNextPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);

  const [FilteringCriteria, setFilteringCriteria] = useState("");
  const [FilteringColumn, setFilteringColumn] = useState("");
  const dynamicColumn = [
    ...column,
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleRowClick(params);
            }}
          >
            View
          </button>
          {/* <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
            onClick={() => handleRowClick}
          ></button> */}
        </div>
      ),
    },
  ];
  // function to navigate to view Details
  const handleRowClick = (event) => {
    dispatch(setDetails(event.data));
    navigate(`/details/${event.data._id}`);
  };
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
      <div style={{ height: 300, width: "70%" }}>
        <AgGridReact
          theme={themeQuartz}
          columnDefs={dynamicColumn}
          rowData={row}
          defaultColDef={{ flex: 1 }}
          animateRows={true}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPressPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <div className="text-lg">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </div>
        <button
          onClick={onPressNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AGDataGrid;
