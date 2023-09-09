import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserData,
  loginFailed,
  selectUser,
  selectUserError,
  selectUserStatus,
} from "redux/features/user/userSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
    // Dispatch the fetchUserData action only if the status is 'idle' to avoid unnecessary fetches
    if (userStatus === "idle") {
      dispatch(fetchUserData());
    }
  }, [userStatus, dispatch]);

  const user = useSelector(selectUser);
  const userError = useSelector(selectUserError);

  useEffect(() => {
    if (userStatus === "succeeded" && user && user.userid) {
      navigate("/dashboard");
    } else if (userStatus === "failed") {
      dispatch(loginFailed({ error: userError }));
      navigate(`/login?error=${encodeURIComponent(userError)}`);
    }
  }, [user, userStatus, userError, navigate, dispatch]);

  return <div>Processing...</div>; // You can show a loader here
};

export default GoogleCallback;
