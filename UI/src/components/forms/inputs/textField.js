import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const MUITextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <TextField
      label={label}
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

export default MUITextField;
