import { Form, Formik } from "formik";

import MUITextField from "../inputs/textField";
import { Box, Button } from "@mui/material";
import getValidationSchema from "./getValidationSchema";
import { useDispatch } from "react-redux";
import { userAPI } from "redux/features/user/userSlice";

//input types: text, checkbox, radio, select, textarea, date, email, password, number, file

const getInitialValues = (fields) => {
  return fields.reduce((values, field) => {
    values[field.name] = field.value || "";
    return values;
  }, {});
};

//prevent default

const CreateForm = (formName, model) => {
  const dispatch = useDispatch();
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
      <Formik
        initialValues={getInitialValues(fields)}
        validationSchema={getValidationSchema(fields)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            userAPI({
              endpoint: model.endpoint,
              method: model.method,
              data: values,
            })
          );
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
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

export default CreateForm;
