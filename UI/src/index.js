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
    bodySmall: {
      fontSize: "0.8rem",
      fontWeight: 400,
    },
  },

  palette: {
    blue: {
      primary: "#0c0d1f",
      secondary: "#16142a",
      sky: "#0d7cf2",
    },
    black: {
      primary: "#000000", //normal body text
      secondary: "#000000",
    },
    white: {
      primary: "#fffffb",
      secondary: "#c0c0bd",
      background: "#f5f5f5", //background color
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

theme.typography.h1 = {
  fontSize: "2.488rem",
  fontWeight: 700,
  color: theme.palette.black.primary,
};

theme.typography.h2 = {
  fontSize: "2.074rem",
  fontWeight: 700,
  color: theme.palette.black.primary,
};

theme.typography.h3 = {
  fontSize: "1.728rem",
  fontWeight: 700,
  color: theme.palette.black.primary,
};

theme.typography.h4 = {
  fontSize: "1.44rem",
  fontWeight: 700,
  color: theme.palette.black.primary,
};

theme.typography.h5 = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: theme.palette.black.primary,
};

theme.typography.h6 = {
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.black.primary,
};

theme.typography.bodyLarge = {
  fontSize: "1.2rem",
  fontWeight: 400,
  color: theme.palette.black.primary,
};

theme.typography.bodyRegular = {
  fontSize: "1rem",
  fontWeight: 400,
  color: theme.palette.black.primary,
};

theme.typography.bodySmall = {
  fontSize: "0.833rem",
  fontWeight: 400,
  color: theme.palette.black.primary,
};

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
