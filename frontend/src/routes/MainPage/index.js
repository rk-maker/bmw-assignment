import { themeQuartz } from 'ag-grid-community';
import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {
  ClientSideRowModelModule,
  NumberEditorModule,
  NumberFilterModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
  themeAlpine,
  themeBalham,
} from "ag-grid-community";
import {
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  SideBarModule,
} from "ag-grid-enterprise";
import { setDetails } from '../../redux/slices';
ModuleRegistry.registerModules([TextEditorModule,
  TextFilterModule,
  NumberFilterModule,
  NumberEditorModule,
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  ValidationModule,
AllCommunityModule]);

function MainPage() {
const navigate = useNavigate();
const dispatch = useDispatch();
const [column,setColumn]=useState([])
const [row,setRow]=useState([])

useEffect(() => {
  const fetchData =async()=>{
    try {
      const response =await fetch("http://localhost:3000/api/v1/bmw/keys",{
        method:'GET'
      })
      if(!response){
        throw new Error('Failed to fetch the data')
      }
      const columnData= await response.json();
      if(columnData?.responseCode=="00"){
        const tempCol=columnData?.data.map(key=>({
          headerName:key.headerName,
          field:key.field,
          // sortable:key.sortable,
          // filter:key.filter
        }))
        setColumn(tempCol)
        
        try {
          console.log(columnData?.data,"------")
          const response2 =await fetch("http://localhost:3000/api/v1/bmw/models",{
            method:'GET'
          })
          if(!response2){
            throw new Error('Failed to fetch the data')
          }
          const rowData= await response2.json();
          if(rowData?.responseCode=="00"){
            setRow(rowData?.data)
            console.log(rowData?.data)
          }
        } catch (error) {
          console.log("erro",error)
        }
      }
      
    } catch (error) {
      console.log("erro",error)
    }
  }
  fetchData()
}, [])
const handleRowClick=(event)=>{
dispatch(setDetails(event.data))
navigate(`/details/${event.data._id}`);
}
  
  return (
    <div className="App">
      <header className="App-header">
      <div  style={{ height:300, width: '70%' }}>
      <AgGridReact
      theme={themeQuartz}
        columnDefs={column} 
        rowData={row}      
        defaultColDef={{flex:1}}
        onRowClicked={handleRowClick}
        // sideBar
      />
    </div>
      </header>
    </div>
  );
}

export default MainPage;
