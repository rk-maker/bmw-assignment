import React from "react";
import "./HomePg.css";
import BMWBuilding from "../../assets/BMWBuilding.png";
import CustomButton from "../../components/Button/Button";
const Homepage = () => {
  return (
    <section className="home">
      <div className="home-content">
        <h1>BMW Car Models</h1>
        <h3>Explore Car Models</h3>
        <p>
          Explore the Car Models in a better way that you have ever imagined
        </p>
        <div className="button">
          <CustomButton width="200px" height="70px">
            Explore Cars
          </CustomButton>
        </div>
      </div>

      <div className="home-image">
        <div className="circle">
          <img src={BMWBuilding} alt="BMW Building" />
        </div>
      </div>
      <div className="circle2"></div>
    </section>
  );
};
export default Homepage;
