import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#035b74",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#595c5e",
    },
    "&:hover fieldset": {
      borderColor: "#306c83",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#035b74",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  },
});

const StyledInput = ({
  label,
  placeholder,
  type = "text",
  variant = "outlined",
  value,
  onChange,
  onKeyDown,
  onIconClick,
  icon,
}) => {
  return (
    <FormControl fullWidth>
      <StyledTextField
        label={label}
        placeholder={placeholder}
        type={type}
        variant={variant}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        InputProps={{
          endAdornment: icon && (
            <InputAdornment position="end">
              <IconButton onClick={onIconClick} sx={{ color: "white" }}>
                {icon}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default StyledInput;
