import { Form, Formik } from "formik";

import MUITextField from "../inputs/textField";
import { Box, Button, Typography } from "@mui/material";
import getValidationSchema from "./getValidationSchema";
import { useDispatch } from "react-redux";
import { apiCall } from "redux/async/asyncThunk";

const getInitialValues = (fields) => {
  return fields?.reduce((values, field) => {
    values[field.name] = field.value || "";
    return values;
  }, {});
};

const CreateForm = (formName, model, children) => {
  const dispatch = useDispatch();
  const fields = model.fields;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Formik
        initialValues={getInitialValues(fields)}
        validationSchema={getValidationSchema(fields)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            apiCall({
              endpoint: model.endpoint,
              method: model.method,
              data: values,
              slice: "userData",
            })
          );
          setSubmitting(false);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
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
                            variant={model.variant}
                            disabled={field.disabled}
                          />
                        );
                      case "file":
                        return (
                          <Box
                            key={field.name}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 3,
                            }}
                          >
                            <input
                              type="file"
                              name={field.name}
                              value={field.value}
                              placeholder={field.placeholder}
                              disabled={field.disabled}
                            />
                          </Box>
                        );

                      default:
                        return null;
                    }
                  })}
                </Box>
                {children}
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  width: "20rem",
                  py: 1,
                  borderRadius: "2rem",
                  textTransform: "none",
                }}
              >
                <Typography variant="bodyRegularBold">{formName}</Typography>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateForm;
