import { useEffect } from "react";
import CreateForm from "../utils/createForm";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const loginModel = {
  name: "Sign In",
  endpoint: "/auth/login",
  method: "post",

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
