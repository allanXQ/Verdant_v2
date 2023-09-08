import createForm from "../utils/createForm";

const loginModel = [
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
];

const LoginForm = () => {
  return createForm("login", loginModel);
};

export default LoginForm;
