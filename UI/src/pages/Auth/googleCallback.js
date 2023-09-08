import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserData,
  loginFailed,
  selectUser,
} from "redux/features/user/userSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  const user = useSelector(selectUser, shallowEqual);

  console.log(user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      // Handle error case
      dispatch(loginFailed({ error: "Login failed" }));
      navigate("/login?error=Login failed");
    }
  }, [user]);

  return <div>Processing...</div>; // You can show a loader here
};

export default GoogleCallback;
