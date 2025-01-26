import React from "react";
import { useSelector } from "react-redux";
import { setDetails } from "../../redux/slices";
import { useParams } from "react-router-dom";
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
    <div>
      <h1>Details {details.Brand}</h1>
    </div>
  );
}
export default BMWProdDet;
