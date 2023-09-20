import React, { useEffect, useState } from "react";
import ResponsiveDrawer, { Sidenav, Topbar } from "../Navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "redux/features/user/userSlice";
import {
  selectDrawerHeight,
  selectDrawerWidth,
  selectTopBarHeight,
} from "redux/features/app/configSlice";
import { apiCall } from "redux/async/asyncThunk";

const RootLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const drawerHeight = useSelector(selectDrawerHeight);
  let drawerWidth = useSelector(selectDrawerWidth);
  const topBarHeight = useSelector(selectTopBarHeight);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const path = location.pathname;
  const isTrade = path.includes("trade/spot");
  isTrade ? (drawerWidth = "0px") : (drawerWidth = drawerWidth);

  useEffect(() => {
    dispatch(
      apiCall({
        endpoint: "user/user-info",
        method: "post",
        data: {
          userId: user.userId,
        },
        slice: "userData",
      })
    );
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoggedIn && (
        <ResponsiveDrawer>
          <Outlet />
        </ResponsiveDrawer>
      )}
    </>
  );
};

export default RootLayout;
