import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import MUITextField from "../inputs/textField";

//input types: text, checkbox, radio, select, textarea, date, email, password, number, file

const getInitialValues = (model) => {
  return model.reduce((values, field) => {
    values[field.name] = field.value || "";
    return values;
  }, {});
};

const getValidationSchema = (model) => {
  let schema = {};

  model.forEach((field) => {
    let validator;

    switch (field.type) {
      case "email":
        validator = Yup.string().email("Invalid email format");
        break;
      case "password":
        validator = Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          );
        break;
      case "number":
        validator = Yup.number().typeError("Must be a number");
        break;
      case "text":
      default:
        validator = Yup.string();
        break;
    }

    if (field.required) {
      validator = validator.required("This field is required");
    }

    schema[field.name] = validator;
  });

  return Yup.object().shape(schema);
};

//prevent default
const onSubmit = (values, { setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
};

const createForm = (formName, model) => {
  return (
    <Formik
      initialValues={getInitialValues(model)}
      validationSchema={getValidationSchema(model)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {model.map((field, index) => {
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
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default createForm;
