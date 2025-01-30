import * as React from "react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { Tune, ViewList as ViewIcon } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AGDataGrid from "../../components/AGGrid/AGDataGrid";
import Header from "../../components/Header/Header";
import Homepage from "../HomePage/HomePg";
import SideBar from "../../components/Sidebar/SideBar";
import { themeQuartz } from "ag-grid-community";
import FilterListIcon from "@mui/icons-material/FilterList";
import About from "../About/About";
import Contact from "../Contact/Contact";
import "./MainPage.css";
import { Dialog, TextField, Box } from "@mui/material";
import StyledInput from "../../components/TextInput/TextInput";
import { urlConstruct } from "../../Utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { setDetails } from "../../redux/slices";

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
  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);
  const [searchedBMWModels, setSearchedBMWModels] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState(false);
  const homeRef = useRef(null);
  const exploreRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}${urlConstruct?.method?.main}${urlConstruct?.endpoints?.keys}`,
          {
            method: "GET",
          }
        );
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
        }
      } catch (error) {
        console.log("erro", error);
      }
    };
    fetchData();
  }, []);
  // Detect when the explore section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (exploreRef.current) {
        const sectionTop = exploreRef.current.getBoundingClientRect().top;
        const sectionBottom = exploreRef.current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (sectionTop <= windowHeight && sectionBottom >= 0) {
          setIsFloatingButtonVisible(true);
        } else {
          setIsFloatingButtonVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.5,
    });

    observer.observe(homeRef.current);
    observer.observe(exploreRef.current);
    observer.observe(aboutRef.current);
    observer.observe(contactRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  //paginated api for the bmwMode Data
  const getData = async (page) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}${urlConstruct?.method?.main}/${urlConstruct?.endpoints?.pagination}?pageNo=${page}&limit=${limit}`,
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
  //searched by id
  const searchedByiD = async (searchQuery) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}${urlConstruct?.method?.main}${urlConstruct?.endpoints?.search}?query=${searchQuery}`,
        {
          method: "GET",
        }
      );
      if (!response) {
        throw new Error("Failed to fetch the data");
      }

      const rowData = await response.json();

      if (rowData?.responseCode === "00") {
        const { searchedbmwModels } = rowData;
        setSearchedBMWModels(searchedbmwModels);
        console.log("------------------------------------", searchedbmwModels);
        // const { bmwModels, totalPages, currentPageNo } = rowData;
        // setRow(bmwModels);
        // setTotalPages(totalPages);
        // setCurrentPage(currentPageNo);
      }
    } catch (error) {}
  };
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
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
  const scrollToSection = (section) => {
    let targetRef = null;

    if (section === "home") {
      targetRef = homeRef;
    } else if (section === "explore") {
      targetRef = exploreRef;
    } else if (section === "about") {
      targetRef = aboutRef;
    } else if (section === "contact") {
      targetRef = contactRef;
    } else if (section === "search") {
      setOpen(true);
      setSearchInput("");
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Ref for section ${section} is not defined or available.`);
    }
  };
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleRowClick = (data) => {
    dispatch(setDetails(data));
    navigate(`/details/${data?._id}`);
  };
  return (
    <div className="App">
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      <section ref={homeRef} id="home" className="section">
        <Homepage />
      </section>
      <SideBar
        column={column}
        isOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
      />
      <section ref={exploreRef} id="explore" className="section">
        <AGDataGrid
          column={column}
          row={row}
          currentPage={currentPage}
          totalPages={totalPages}
          onPressPreviousPage={handlePreviousPage}
          onPressNextPage={handleNextPage}
          isPaginated={true}
        />
      </section>
      <section ref={aboutRef} id="about" className="section">
        <Suspense fallback={<div>Loading About Section...</div>}>
          <About />
        </Suspense>
      </section>
      <section ref={contactRef} id="contact" className="section">
        <Suspense fallback={<div>Loading Contact Section...</div>}>
          <Contact />
        </Suspense>
      </section>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            background: "rgba(41, 48, 48, 0.9)",
            backdropFilter: "blur(20px)",
            padding: "16px",
            borderRadius: "10px",
            color: "white",
          },
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* <TextField
            autoFocus
            fullWidth
            variant="outlined"
            placeholder="Search..."
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          /> */}
          <StyledInput
            label="Search"
            placeholder="Enter Model or Brand etc ..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchedBMWModels([]);
              setSearched(false);
            }}
            onKeyDown={(e) => () => {
              if (e.key === "Escape") {
                setOpen(false);
                setSearched(false);
              }
            }}
            onIconClick={() => {
              searchedByiD(searchInput);
              setSearched(true);
            }}
            icon={<SearchIcon />}
          />
        </Box>
        <List>
          {searchedBMWModels.length === 0 && searched ? (
            <ListItem>No results found</ListItem>
          ) : (
            searchedBMWModels.map((product) => (
              <ListItem key={product._id}>
                <ListItemText
                  primary={`${product.Brand} `}
                  // secondary={`€${product.PriceEuro}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "#727577", display: "inline" }}
                      >
                        {`€${product.PriceEuro}`}
                      </Typography>

                      {` — ${product.Model}`}
                    </React.Fragment>
                  }
                />
                <ListItemIcon>
                  <IconButton
                    onClick={() => {
                      handleRowClick(product);
                      // Open the product detail page or dialog
                      console.log("View details for", product);
                    }}
                  >
                    <ViewIcon style={{ color: "white" }} />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))
          )}
        </List>
      </Dialog>
      {isFloatingButtonVisible && (
        <Fab
          className="floating-button"
          color="primary"
          aria-label="scroll-to-top"
          onClick={toggleSideBar}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            color: "var(--primary-txt-color)",
            background: "var(--primary-a30)",
          }}
        >
          <FilterListIcon />
        </Fab>
      )}
    </div>
  );
}

export default MainPage;
