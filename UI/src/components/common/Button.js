const { Button, Typography, useTheme, IconButton } = require("@mui/material");
import { DarkMode, LightMode } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectTheme, updateTheme } from "redux/features/app/configSlice";
import { store } from "redux/store";

export const MuiButton = (props) => {
  const { variant, color, onClick, sx, content, disabled, href } = props;
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      //   color={color}
      onClick={onClick}
      disabled={disabled}
      href={href}
      sx={{
        textTransform: "none",
        ...sx,
      }}
    >
      {content && (
        <Typography
          variant="bodyRegularBold"
          color={
            variant === "text" || variant === "outlined"
              ? theme.palette.blue.main
              : theme.palette.white.main
          }
        >
          {content}
        </Typography>
      )}
    </Button>
  );
};

export const ThemeButton = () => {
  const changeTheme = () => {
    store.dispatch(updateTheme());
  };

  const currentTheme = useSelector(selectTheme);

  return (
    <IconButton onClick={changeTheme}>
      {currentTheme === "dark" ? (
        <LightMode
          sx={{
            color: currentTheme === "dark" ? "bgColor.light" : "bgColor.dark",
          }}
        />
      ) : (
        <DarkMode
          sx={{
            color: currentTheme === "dark" ? "bgColor.light" : "bgColor.dark",
          }}
        />
      )}
    </IconButton>
  );
};
