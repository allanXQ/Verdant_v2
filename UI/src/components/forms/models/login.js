import CreateForm from "../utils/createForm";

const loginModel = {
  name: "Sign In",

  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
  ],
};

const LoginForm = () => {
  return CreateForm("login", loginModel);
};

export default LoginForm;
