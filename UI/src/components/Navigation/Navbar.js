import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  AccountBalanceOutlined as AccountBalance,
  CalculateOutlined as Calculate,
  ChatOutlined as Chat,
  DashboardOutlined as Dashboard,
  ExpandLess,
  ExpandMore,
  HistoryOutlined as History,
  LogoutOutlined as Logout,
  PaymentOutlined as Payment,
  PersonOutlined as Person,
  PointOfSaleOutlined as PointOfSale,
  ReceiptOutlined as Receipt,
  RedeemOutlined as Redeem,
  RequestPageOutlined as RequestPage,
  RequestQuoteOutlined as RequestQuote,
  ShowChartOutlined as ShowChart,
} from "@mui/icons-material";
import {
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/features/app/configSlice";

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const currentTheme = useSelector(selectTheme);

  const iconColor = {
    color: currentTheme === "light" ? "bgColor.dark" : "bgColor.light",
  };

  const navlinks = [
    {
      name: "Dashboard",
      icon: <Dashboard sx={iconColor} />,
      path: "/dashboard",
    },
    {
      name: "Profile",
      icon: <Person sx={iconColor} />,
      path: "/profile",
    },
    {
      name: "Transact",
      icon: <PointOfSale sx={iconColor} />,
      submenu: [
        {
          name: "Deposit",
          icon: <AccountBalance sx={iconColor} />,
          path: "/transact/deposit",
        },
        {
          name: "Withdraw",
          icon: <Redeem sx={iconColor} />,
          path: "/transact/withdraw",
        },
        {
          name: "Request Loan",
          icon: <RequestQuote sx={iconColor} />,
          path: "/transact/request-loan",
        },
        {
          name: "Pay Loan",
          icon: <Payment sx={iconColor} />,
          path: "/transact/pay-loan",
        },
      ],
    },
    {
      name: "Trade",
      icon: <ShowChart sx={iconColor} />,
      submenu: [
        {
          name: "Spot",
          icon: <AccountBalance sx={iconColor} />,
          path: "/trade/spot",
        },
        {
          name: "P2P",
          icon: <Redeem sx={iconColor} />,
          path: "/trade/p2p",
        },
        {
          name: "Swap",
          icon: <Redeem sx={iconColor} />,
          path: "/trade/swap",
        },
      ],
    },
    {
      name: "Loan Calculator",
      icon: <Calculate sx={iconColor} />,
      path: "/loan-calculator",
    },
    {
      name: "Conversations",
      icon: <Chat sx={iconColor} />,
      path: "/Conversations",
      badge: 4,
    },
    {
      name: "History",
      icon: <History sx={iconColor} />,
      submenu: [
        {
          name: "Deposits",
          icon: <Receipt sx={iconColor} />,
          path: "/history/deposits",
        },
        {
          name: "Withdrawals",
          icon: <Receipt sx={iconColor} />,
          path: "/history/withdrawals",
        },
        {
          name: "Loan Requests",
          icon: <RequestPage sx={iconColor} />,
          path: "/history/loan-requests",
        },
        {
          name: "Loan Payments",
          icon: <Receipt sx={iconColor} />,
          path: "/history/loan-payments",
        },
      ],
    },

    {
      name: "Logout",
      icon: <Logout sx={iconColor} />,
      path: "/logout",
    },
  ];

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {navlinks.map((item, index) => (
          <div key={index}>
            <ListItem
              button
              onClick={() => item.submenu && handleSubMenuToggle(index)}
              component={!item.submenu && Link}
              to={item.path}
            >
              <ListItemIcon
                sx={{
                  minWidth: 35,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="bodyRegular">{item.name}</Typography>
              </ListItemText>
              {item.submenu ? (
                openSubMenu === index ? (
                  <ExpandLess sx={iconColor} />
                ) : (
                  <ExpandMore sx={iconColor} />
                )
              ) : null}
            </ListItem>
            {item.submenu && (
              <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subitem, subindex) => (
                    <ListItem key={subindex} disablePadding>
                      <ListItemButton component={Link} to={subitem.path}>
                        <ListItemIcon
                          sx={{
                            minWidth: 35,
                          }}
                        >
                          {subitem.icon}
                        </ListItemIcon>
                        <Typography variant="bodyRegular">
                          {subitem.name}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                {}
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor:
          currentTheme === "light" ? "bgColor.light" : "bgColor.dark",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          backgroundColor:
            currentTheme === "light" ? "bgColor.light" : "bgColor.dark",
        }}
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
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            // color: currentTheme === "light" ? "bgColor.light" : "bgColor.dark",

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:
                currentTheme === "light" ? "bgColor.light" : "bgColor.dark",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
export default ResponsiveDrawer;
