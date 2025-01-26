import { themeQuartz } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AGDataGrid from "../../components/AGDataGrid";
function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [FilteringCriteria, setFilteringCriteria] = useState("");
  const [FilteringColumn, setFilteringColumn] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/bmw/keys", {
          method: "GET",
        });
        if (!response) {
          throw new Error("Failed to fetch the data");
        }
        const columnData = await response.json();
        if (columnData?.responseCode === "00") {
          const tempCol = columnData?.data.map((key) => ({
            headerName: key.headerName,
            field: key.field,
            // sortable:key.sortable,
            // filter:key.filter
          }));
          setColumn(tempCol);
          getData(pageNo);
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
        console.log("erro", error);
      }
    };
    fetchData();
  }, []);

  // const onPaginationChanged=(param)=>{
  //   const currentPage=param.api.paginationGetCurrentPage()
  //   const newPage =currentPage+1;
  //   if(newPage!== currentPage){
  //     getData(newPage)
  //   }
  // }
  //paginated api for the bmwMode Data
  const getData = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/bmw/pagination?pageNo=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      if (!response) {
        throw new Error("Failed to fetch the data");
      }

      const rowData = await response.json();

      if (rowData?.responseCode === "00") {
        console.log(rowData?.totalPages);
        const { bmwModels, totalPages, currentPageNo } = rowData;
        setRow(bmwModels);
        setTotalPages(totalPages);
        setCurrentPage(currentPageNo);
      }
    } catch (error) {}
  };

  // // to handle  next page in paginated api
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      getData(currentPage + 1);
    }
  };
  // to handle  previous page in paginated api

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      getData(currentPage - 1);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <AGDataGrid
          column={column}
          row={row}
          currentPage={currentPage}
          totalPages={totalPages}
          onPressPreviousPage={handlePreviousPage}
          onPressNextPage={handleNextPage}
        />
      </header>
    </div>
  );
}

export default MainPage;
