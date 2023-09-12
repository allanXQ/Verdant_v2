import React, { useEffect, useState } from "react";
import { Sidenav, Topbar } from "../Navigation/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "redux/features/user/userSlice";
import {
  selectDrawerHeight,
  selectDrawerWidth,
  selectTopBarHeight,
} from "redux/features/app/configSlice";

const RootLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const drawerHeight = useSelector(selectDrawerHeight);
  const drawerWidth = useSelector(selectDrawerWidth);
  const topBarHeight = useSelector(selectTopBarHeight);
  console.log(drawerHeight, drawerWidth, topBarHeight);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
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
          <Grid item>
            <Sidenav
              drawerHeight={drawerHeight}
              drawerWidth={drawerWidth}
              topBarHeight={topBarHeight}
              isOpen={open}
            />
          </Grid>
          <Grid item>
            <Topbar
              topBarHeight={topBarHeight}
              drawerWidth={drawerWidth}
              isOpen={open}
              setOpen={setOpen}
            />
            <Grid
              container
              sx={{
                mt: `calc(${topBarHeight} + 1rem)`,
                width: { md: `calc(100vw - ${drawerWidth})` },
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
