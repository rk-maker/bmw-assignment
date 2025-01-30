import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Speed,
  DirectionsCar,
  EventSeat,
  Euro,
  Category,
} from "@mui/icons-material";
import "./bmw-style.css";

function BMWProdDet() {
  const details = useSelector((state) => state.bmwModelDetails.details);
  const { id } = useParams();

  if (!details) {
    return (
      <div>
        <h1>No data available</h1>
      </div>
    );
  }
  if (details._id !== id) {
    return (
      <div>
        <h1>Details not found</h1>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="card-info">
              <h1>{details?.Brand}</h1>
              <div className="info-row">
                {/* <DirectionsCar className="icon" /> */}
                <p>Model: {details?.Model}</p>
              </div>
              <div className="info-row">
                {/* <Speed className="icon" /> */}
                <p>Efficiency: {details?.Efficiency_Whkm} Wh/km</p>
              </div>
              <div className="info-row">
                {/* <Speed className="icon" /> */}
                <p>Fast Charge: {details?.Fastcharge_KmH} km/h</p>
              </div>
              <div className="info-row">
                {/* <EventSeat className="icon" /> */}
                <p>Seats: {details?.Seats}</p>
              </div>
              <div className="info-row">
                {/* <Euro className="icon" /> */}
                <p>Price: €{details?.PriceEuro}</p>
              </div>
              <div className="info-row">
                {/* <Category className="icon" /> */}
                <p>Body Style: {details?.BodyStyle}</p>
              </div>
              <div className="info-row">
                {/* <Category className="icon" /> */}
                <p>Segment: {details?.Segment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMWProdDet;
