import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AGDataGrid from "../../components/AGDataGrid";
import Header from "../../components/Header/Header";
import Homepage from "../HomePage/HomePg";
import SideBar from "../../components/Sidebar/SideBar";
import { themeQuartz } from "ag-grid-community";
import FilterListIcon from "@mui/icons-material/FilterList";
import About from "../About/About";
import Contact from "../Contact/Contact";
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

  const homeRef = useRef(null);
  const exploreRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
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

  return (
    <div className="App">
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      <section ref={homeRef} id="home">
        <Homepage />
      </section>
      <SideBar
        column={column}
        isOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
      />
      <section ref={exploreRef} id="explore">
        <AGDataGrid
          column={column}
          row={row}
          currentPage={currentPage}
          totalPages={totalPages}
          onPressPreviousPage={handlePreviousPage}
          onPressNextPage={handleNextPage}
        />
      </section>
      <section ref={aboutRef} id="about">
        <Suspense fallback={<div>Loading About Section...</div>}>
          <About />
        </Suspense>
      </section>
      <section ref={contactRef} id="contact">
        <Suspense fallback={<div>Loading Contact Section...</div>}>
          <Contact />
        </Suspense>
      </section>
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
