import { Box, Typography } from "@mui/material";
import LoginForm from "components/forms/models/login";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "redux/features/user/userSlice";
import Auth from "./auth";

const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  //get params
  const params = new URLSearchParams(window.location.search);
  const message = params.get("message");
  console.log(message);
  const sublink = {
    pathname: "/register",
    sublinkText: "Sign Up",
    text: "New here? ",
  };
  return (
    <Auth title="Sign In" sublink={sublink}>
      <LoginForm>
        <Box>
          <Typography variant="caption" component={Link} to="/forgot-password">
            Forgot password?
          </Typography>
        </Box>
      </LoginForm>
    </Auth>
  );
};

export default Login;
