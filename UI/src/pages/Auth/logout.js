import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { apiCall } from "redux/async/asyncThunk";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const logoutAsync = () => {
      try {
        isLoggedIn &&
          dispatch(
            apiCall({
              endpoint: "auth/logout",
              method: "post",
              data: {},
              slice: "userData",
            })
          );
        localStorage.removeItem("persist:root");
        // If the logout was successful, navigate to the login page
        !isLoggedIn && navigate("/login");
      } catch (error) {
        // Handle any errors if needed
        localStorage.removeItem("persist:root");
        console.error("Logout failed: ", error);
      }
    };

    logoutAsync();
  }, [dispatch, navigate, isLoggedIn]);

  return <div>Logout</div>;
};

export default Logout;
