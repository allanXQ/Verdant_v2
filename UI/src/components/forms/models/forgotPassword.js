import { useEffect } from "react";
import CreateForm from "../utils/createForm";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ForgotPasswordModel = {
  name: "Forgot Password",
  endpoint: "/auth/forgot-password",
  method: "post",

  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
  ],
};

const ForgotPasswordForm = () => {
  return CreateForm("ForgotPassword", ForgotPasswordModel);
};

export default ForgotPasswordForm;
