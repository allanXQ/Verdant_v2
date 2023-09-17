import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { persistor, store } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
    },
  },
  typography: {
    navlink: {
      fontSize: "1rem",
      color: "#fffffb",
      textDecoration: "none",
    },
  },

  palette: {
    blue: {
      primary: "#0c0d1f",
      secondary: "#16142a",
      sky: "#0d7cf2",
    },
    white: {
      primary: "#fffffb",
      secondary: "#c0c0bd",
    },
    green: {
      primary: "#00b341",
      secondary: "#00b341",
    },
    red: {
      primary: "#ff0000",
      secondary: "#ff0000",
    },
    yellow: {
      primary: "#f2c94c",
      secondary: "#f2c94c",
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
