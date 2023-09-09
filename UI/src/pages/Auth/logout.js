import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "redux/features/user/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(userLogout());
  return <div>Logout</div>;
};

export default Logout;
