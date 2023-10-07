const { createTheme } = require("@mui/material");
const { useSelector } = require("react-redux");
const { selectTheme } = require("redux/features/app/configSlice");

const useStyledTheme = () => {
  const currentTheme = useSelector(selectTheme);
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
      },
    },
    palette: {
      blue: {
        primary: "#0c0d1f",
        secondary: "#16142a",
        sky: "#0d7cf2",
      },
      bgColor: {
        light: "#ffffff",
        dark: "#16142a",
      },
      black: {
        main: "#424242",
        light: "#616161",
        dark: "#212121",
      },
      white: {
        primary: "#ffffff",
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
    },

    typography: {
      h1: {
        fontSize: "2.488rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2.074rem",
        fontWeight: 700,
      },
      h3: {
        fontSize: "1.728rem",
        fontWeight: 700,
      },
      h4: {
        fontSize: "1.44rem",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.2rem",
        fontWeight: 700,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      bodyLarge: {
        fontSize: "1.2rem",
        fontWeight: 400,
      },
      bodyRegular: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      bodyRegularBold: {
        fontSize: "1rem",
        fontWeight: 700,
      },
      bodySmall: {
        fontSize: "0.833rem",
        fontWeight: 400,
      },
      bodySmallBold: {
        fontSize: "0.9rem",
        fontWeight: 700,
      },
    },
  });

  [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "bodyLarge",
    "bodyRegular",
    "bodyRegularBold",
    "bodySmall",
    "bodySmallBold",
  ].forEach((key) => {
    theme.typography[key].color =
      currentTheme === "light"
        ? theme.palette.black.main
        : theme.palette.white.primary;
  });

  theme.components.MuiCssBaseline = {
    styleOverrides: {
      body: {
        backgroundColor:
          currentTheme === "light"
            ? theme.palette.bgColor.light
            : theme.palette.bgColor.dark,
      },
      //may update later
      "::-webkit-scrollbar": {
        width: "0em",
        height: "0em",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor:
          currentTheme === "light"
            ? theme.palette.bgColor.light
            : theme.palette.bgColor.dark,
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor:
          currentTheme === "light"
            ? theme.palette.white.secondary
            : theme.palette.primary.main,
        borderRadius: "2rem",
      },
    },
  };

  return theme;
};

export default useStyledTheme;
