import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice"; // Adjust path as necessary
import { useLocation, useHistory } from "react-router-dom";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Here, you would make an API call to your backend with the authorization code
    // to get the user info and tokens, and then dispatch an action to update
    // your Redux store.

    // For demonstration, let's assume you have parsed user info and tokens
    // from the API response or cookies
    const user = {}; // Get user info from API response or cookies
    const token = {}; // Get token from API response or cookies

    if (user && token) {
      dispatch(loginSuccess({ user, token }));
      history.push("/dashboard"); // Redirect to dashboard or other page
    } else {
      // Handle error case
      history.push("/login?error=Login failed"); // Redirect to login with error message
    }
  }, [dispatch, location, history]);

  return <div>Processing...</div>; // You can show a loader here
};

export default GoogleCallback;
