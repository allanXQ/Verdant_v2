import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const MUITextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      variant={props.variant || "standard"}
      label={label}
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
      autoComplete="off"
      // color="blue.sky"
      focused
      sx={{
        width: "20rem",

        "& .Mui-focused": {
          backgroundColor: "transparent",
        },
        // "& .MuiInputBase-input": {
        //   color: "white.primary",
        //   "&:focus": {
        //     backgroundColor: "transparent",
        //   },
        // },
        // "& .MuiInput-input": {
        //   color: "#fff", // Custom color for the input text
        // },
      }}
    />
  );
};

export default MUITextField;
