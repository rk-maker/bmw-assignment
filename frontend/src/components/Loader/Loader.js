import React from "react";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/slices"; // Assuming your slice is in the same directory

const Loader = () => {
  const loading = useSelector(selectLoading);

  if (!loading) return null;

  return (
    <div style={styles.loaderWrapper}>
      <div style={styles.loader}></div>
    </div>
  );
};

const styles = {
  loaderWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loader: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  },
};

export default Loader;
