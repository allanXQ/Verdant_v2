import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { selectTheme, updateTheme } from "redux/features/app/configSlice";
import { store } from "redux/store";
import { useSelector } from "react-redux";
import { DarkMode, LightMode } from "@mui/icons-material";

const drawerWidth = 200;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const currentTheme = useSelector(selectTheme);

  const changeTheme = () => {
    store.dispatch(updateTheme());
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {/* <ListItemText primary={item}> */}
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              {/* </ListItemText> */}
            </ListItemButton>
          </ListItem>
        ))}
        {/* dark mode */}
        <ListItem disablePadding>
          <IconButton onClick={changeTheme}>
            {currentTheme === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </ListItem>

        <ListItem disablePadding>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={
          {
            // backgroundColor: "blue.primary",
          }
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <IconButton onClick={changeTheme}>
              {currentTheme === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        component="main"
        sx={{
          display: "flex",
          p: 3,
          backgroundColor:
            currentTheme === "light" ? "bgColor.light" : "bgColor.dark",
          width: "100vw",
          // height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

const HomeLayout = () => {
  return (
    <DrawerAppBar>
      <Outlet />
    </DrawerAppBar>
  );
};

export default HomeLayout;
