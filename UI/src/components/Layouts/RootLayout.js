import React, { useEffect, useState } from "react";
import { Sidenav, Topbar } from "../Navigation/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  selectUserStatus,
} from "redux/features/user/userSlice";
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
        <Grid
          container
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <Grid
            item
            sx={{
              display: isTrade && "none",
            }}
          >
            <Sidenav
              drawerHeight={drawerHeight}
              drawerWidth={drawerWidth}
              topBarHeight={topBarHeight}
              isOpen={open}
            />
          </Grid>
          <Grid container>
            <Grid
              item
              sx={{
                // mt: isTrade ? topBarHeight : `calc(${topBarHeight} + 1rem)`,
                width: { md: `calc(100vw - ${drawerWidth})` },
                height: "100vh",
              }}
            >
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default RootLayout;
