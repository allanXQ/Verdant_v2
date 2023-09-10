import LoginForm from "components/forms/models/login";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "redux/features/user/userSlice";
import getGoogleOAuthUrl from "utils/googleOAuthUrl";

const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <LoginForm />
      <a href={getGoogleOAuthUrl()}>Login with google</a>
    </div>
  );
};

export default Login;
