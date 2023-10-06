import { TextField, useTheme } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import { useField } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/features/app/configSlice";

const MUITextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const currentTheme = useSelector(selectTheme);
  return (
    <TextField
      variant={props.variant || "standard"}
      label={label}
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
      autoComplete="off"
      focused
      sx={{
        width: "20rem",
        color: currentTheme === "light" ? "bgColor.dark" : "bgColor.light",

        "& .MuiInputBase-input": {
          color: currentTheme === "light" ? "bgColor.dark" : "bgColor.light",
          boxShadow: "none",
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
        "& .MuiInput-input": {
          color: currentTheme === "light" ? "bgColor.dark" : "bgColor.light",
          boxShadow: "none",
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      }}
    />
  );
};

export default MUITextField;
