import { Field, Formik } from "formik";
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
    switch (field.type) {
      case "email":
        schema[field.name] = schema[field.name].email("Invalid email format");
        break;
      case "password":
        schema[field.name] = schema[field.name]
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          );
        break;
      default:
        break;
    }

    if (field.required) {
      schema[field.name] = Yup.string().required("This field is required");
    }
  });

  return Yup.object().shape(schema);
};

const createForm = (formName, model) => {
  console.log(getInitialValues(model));
  return (
    <Formik
      initialValues={getInitialValues(model)}
      validationSchema={getValidationSchema(model)}
    >
      {({ values, errors, touched }) => (
        <form>
          {model.map((field, index) => {
            field.value = values[field.name];
            field.error = errors[field.name];
            field.touched = touched[field.name];
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
        </form>
      )}
    </Formik>
  );
};

export default createForm;
