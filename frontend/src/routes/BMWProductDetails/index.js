import React from "react";
import { useSelector } from "react-redux";
import { setDetails } from "../../redux/slices";
import { useParams } from "react-router-dom";
import "./bmw-style.css";
function BMWProdDet() {
  const details = useSelector((state) => state.details.details);
  const { id } = useParams();
  if (!details) {
    return (
      <div>
        <h1>no data available</h1>
      </div>
    );
  }
  if (details._id !== id) {
    return (
      <div>
        <h1>Deatils not found</h1>
      </div>
    );
  }
  return (
    <div className="app-container">
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="card-image"></div>
            <div className="card-info">
              <h1>Product Name</h1>
              <p>$99.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BMWProdDet;
