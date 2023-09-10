import { Field, Form, Formik } from "formik";

import MUITextField from "../inputs/textField";
import { Box, Button, Typography } from "@mui/material";
import getValidationSchema from "./getValidationSchema";

//input types: text, checkbox, radio, select, textarea, date, email, password, number, file

const getInitialValues = (fields) => {
  return fields.reduce((values, field) => {
    values[field.name] = field.value || "";
    return values;
  }, {});
};

//prevent default
const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const createForm = (formName, model) => {
  const fields = model.fields;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // gap: "1rem",
      }}
    >
      <Typography>{model.name}</Typography>
      <Formik
        initialValues={getInitialValues(fields)}
        validationSchema={getValidationSchema(fields)}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
              >
                {fields.map((field, index) => {
                  switch (field.type) {
                    case "email":
                    case "password":
                    case "text":
                    case "number":
                      return (
                        <MUITextField
                          key={field.name}
                          type={field.type}
                          required={field.required}
                          label={field.label}
                          name={field.name}
                          value={field.value}
                          placeholder={field.placeholder}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  width: "10%",
                }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default createForm;
