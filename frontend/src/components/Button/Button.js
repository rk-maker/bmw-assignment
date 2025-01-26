import React from "react";
import { Button } from "@mui/material";

function CustomButton({
  onClick,
  backgroundColor = "var(--primary-a0)",
  textColor = "var(--primary-txt-color)",
  isIcon = false,
  icon,
  children,
  width = "auto",
  height = "auto",
  disabled = false,
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        borderRadius: 100,
        width: width,
        height: height,
      }}
      startIcon={isIcon ? icon : null}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
