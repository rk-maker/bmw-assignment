import { themeQuartz } from "ag-grid-community";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { useNavigate } from "react-router-dom";
import { setDetails } from "../../redux/slices";
import { FilterCriteria } from "../../Utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./AgGrid.css";
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
import FilterData from "../FilterData";
import CustomButton from "../Button/Button";
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
  isPaginated = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);

  const [FilteringCriteria, setFilteringCriteria] = useState("");
  const [FilteringColumn, setFilteringColumn] = useState("");
  const myTheme = themeQuartz.withParams({
    accentColor: "var(--Tonal-a50)",
    backgroundColor: "var(--Tonal-a10)",
    borderColor: "var(--primary-a20)",
    borderRadius: 20,
    browserColorScheme: "dark",
    cellHorizontalPaddingScale: 1,
    chromeBackgroundColor: {
      ref: "backgroundColor",
    },
    columnBorder: false,
    fontFamily: {
      googleFont: "Roboto",
    },
    fontSize: 16,
    headerBackgroundColor: "var(--primary-a0)",
    headerFontSize: 16,
    headerFontWeight: 400,
    headerTextColor: "var(--primary-txt-color)",
    headerVerticalPaddingScale: 0.9,
    iconSize: 20,
    rowBorder: false,
    rowVerticalPaddingScale: 1.2,
    sidePanelBorder: false,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 0,
    inputBorderRadius: 50,
    textColor: "var(--secondary-txt-color)",
  });
  const dynamicColumn = [
    ...column,
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            onClick={() => handleRowClick(params)}
            style={{ cursor: "pointer" }}
          >
            <VisibilityIcon />
          </div>
          <div
            onClick={() => handleRowClick(params)}
            style={{ cursor: "pointer" }}
          >
            <DeleteForeverIcon />
          </div>
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
      <h1 className="explore-cars">Explore Cars</h1>

      <div
        style={{
          height: 300,
          width: "90%",
          margin: "0 auto", // Center the grid horizontally
        }}
      >
        <AgGridReact
          theme={myTheme}
          columnDefs={dynamicColumn}
          rowData={row}
          defaultColDef={{ flex: 1 }}
          animateRows={true}
        />
      </div>
      {/* Button container */}
      {isPaginated ? (
        <div
          className="flex items-center"
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end", // Align content to the right
            marginTop: "10px", // Space between grid and buttons
            width: "90%", // Matches the grid width
            marginLeft: "auto", // Centers the button container relative to grid
            marginRight: "auto", // Centers the button container relative to grid
            gap: "10px",
          }}
        >
          <CustomButton
            onClick={onPressPreviousPage}
            disabled={currentPage === 1}
            width={"120px"}
          >
            Previous
          </CustomButton>
          <div
            className="text-lg"
            style={{ color: "var(--primary-txt-color)" }}
          >
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </div>
          <CustomButton
            onClick={onPressNextPage}
            width={"120px"}
            disabled={currentPage === totalPages}
          >
            Next
          </CustomButton>
        </div>
      ) : null}
    </div>
  );
};

export default AGDataGrid;
