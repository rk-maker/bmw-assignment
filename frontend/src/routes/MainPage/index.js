import { themeQuartz } from 'ag-grid-community';
import { useCallback, useEffect ,useState} from 'react';
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
  PaginationModule
} from "ag-grid-community";
import {
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  SideBarModule,
  ServerSideRowModelModule
} from "ag-grid-enterprise";
import { setDetails } from '../../redux/slices';
ModuleRegistry.registerModules([TextEditorModule,
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
AllCommunityModule]);

function MainPage() {
const navigate = useNavigate();
const dispatch = useDispatch();
const [column,setColumn]=useState([])
const [row,setRow]=useState([])
const [pageNo,setPageNo]=useState(1)
const [limit,setLimti]=useState(10)
const [totalPages,setTotalPages]=useState(0)
const [currentPage,setCurrentPage]=useState(1)

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
        getData(pageNo)
        // try {
        //   console.log(columnData?.data,"------")
        //   const response2 =await fetch("http://localhost:3000/api/v1/bmw/models",{
        //     method:'GET'
        //   })
        //   if(!response2){
        //     throw new Error('Failed to fetch the data')
        //   }
        //   const rowData= await response2.json();
          // if(rowData?.responseCode=="00"){
          //   setRow(rowData?.data)
          //   console.log(rowData?.data)
          // }
        // } catch (error) {
        //   console.log("erro",error)
        // }
      }
      
    } catch (error) {
      console.log("erro",error)
    }
  }
  fetchData()
}, [])

// const onPaginationChanged=(param)=>{
//   const currentPage=param.api.paginationGetCurrentPage()
//   const newPage =currentPage+1;
//   if(newPage!== currentPage){
//     getData(newPage)
//   }
// }
const getData =async(page)=>
  {
    try {
      const response =await fetch(`http://localhost:3000/api/v1/bmw/pagination?pageNo=${page}&limit=${limit}`,{
        method:'GET'
      })
      if(!response){
        throw new Error('Failed to fetch the data')
      } 

      const rowData=await response.json()
   
      
      if(rowData?.responseCode=="00"){
        console.log(rowData?.totalPages)
        const {bmwModels,totalPages,currentPageNo}=rowData
        setRow(bmwModels)
        setTotalPages(totalPages)
        setCurrentPage(currentPageNo)
      }
    } catch (error) {
      
    }

}
// function to 
const handleRowClick=(event)=>{
dispatch(setDetails(event.data))
navigate(`/details/${event.data._id}`);
}
  const handleNextPage=()=>{
    if(currentPage<totalPages){
      getData(currentPage+1)
    }
  }
  const handlePreviousPage=()=>{
    if(currentPage>1){
      getData(currentPage-1)
    }
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
        animateRows={true}
      
        
        
        // sideBar
      />
    </div>
    <div className='flex items-center justify-between mb-4'>
      <button
      onClick={handlePreviousPage}
      disabled={currentPage===1}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${
        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
      }`}>
          Previous
      </button>
      <div className="text-lg">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
    </div>
      </header>
    </div>
  );
}

export default MainPage;
