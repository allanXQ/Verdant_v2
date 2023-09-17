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
      sx={{
        width: "25rem",
        "& .Mui-focused": {
          backgroundColor: "transparent",
        },
        "& .MuiInputBase-input": {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      }}
    />
  );
};

export default MUITextField;
