const { createTheme } = require("@mui/material");

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
      light: "#f5f5f5",
      dark: "#16142a",
    },
    black: {
      primary: "#000000",
      secondary: "#000000",
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

theme.typography.h1 = {
  fontSize: "2.488rem",
  fontWeight: 700,
};

theme.typography.h2 = {
  fontSize: "2.074rem",
  fontWeight: 700,
};

theme.typography.h3 = {
  fontSize: "1.728rem",
  fontWeight: 700,
};

theme.typography.h4 = {
  fontSize: "1.44rem",
  fontWeight: 700,
};

theme.typography.h5 = {
  fontSize: "1.2rem",
  fontWeight: 700,
};

theme.typography.h6 = {
  fontSize: "1rem",
  fontWeight: 700,
};

theme.typography.bodyLarge = {
  fontSize: "1.2rem",
  fontWeight: 400,
};

theme.typography.bodyRegular = {
  fontSize: "1rem",
  fontWeight: 400,
};

theme.typography.bodySmall = {
  fontSize: "0.833rem",
  fontWeight: 400,
};

//loop through the theme object and add the color to the typography.
for (const color in theme.palette) {
  theme.typography[color] = {
    color: theme.palette[color].primary,
  };
}

export default theme;
