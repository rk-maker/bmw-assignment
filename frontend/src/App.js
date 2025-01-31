import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./routes/MainPage/index";
import BMWProdDet from "./routes/BMWProductDetails/index";
import Header from "./components/Header/Header";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details/:id" element={<BMWProdDet />} />
        <Route path="/searchedModels" element={<BMWProdDet />} />
      </Routes>
    </Router>
  );
}
export default App;
