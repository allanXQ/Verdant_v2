import LoginForm from "components/forms/models/login";
import React from "react";
import getGoogleOAuthUrl from "utils/googleOAuthUrl";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <a href={getGoogleOAuthUrl()}>Login with google</a>
    </div>
  );
};

export default Login;
