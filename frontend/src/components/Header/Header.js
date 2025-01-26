import React from "react";
import "./header.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Header = ({ scrollToSection, activeSection }) => {
  const isActive = (section) => (activeSection === section ? "active" : "");

  return (
    <header className="header">
      <a href="#" className="logo">
        BMW Group
      </a>
      <nav className="navbar">
        <a
          href="#home"
          className={isActive("home")}
          style={{ "--i": 1 }}
          onClick={() => scrollToSection("home")}
        >
          Home
        </a>
        <a
          href="#explore"
          className={isActive("explore")}
          style={{ "--i": 2 }}
          onClick={() => scrollToSection("explore")}
        >
          Explore Models
        </a>
        <a
          href="#search"
          className={isActive("search")}
          style={{ "--i": 3 }}
          onClick={() => scrollToSection("search")}
        >
          Search
        </a>
        <a
          href="#about"
          className={isActive("about")}
          style={{ "--i": 4 }}
          onClick={() => scrollToSection("about")}
        >
          About
        </a>
        <a
          href="#contact"
          className={isActive("contact")}
          style={{ "--i": 5 }}
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </a>
      </nav>
      <div className="social-media">
        <a href="#" className="nav-item">
          <TwitterIcon style={{ "--i": 1, color: "white" }} />
        </a>
        <a href="#" className="nav-item">
          <FacebookRoundedIcon style={{ "--i": 2, color: "white" }} />
        </a>
        <a href="#" className="nav-item">
          <InstagramIcon style={{ "--i": 3, color: "white" }} />
        </a>
      </div>
    </header>
  );
};

export default Header;
