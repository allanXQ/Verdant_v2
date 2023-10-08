import { Button, Typography, useTheme, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, updateTheme } from "redux/features/app/configSlice";

export const MuiButton = (props) => {
  const { variant, color, onClick, sx, content, disabled, href, children } =
    props;
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
      {children}
    </Button>
  );
};

export const ThemeButton = () => {
  const dispatch = useDispatch();
  const changeTheme = () => {
    dispatch(updateTheme());
  };

  const currentTheme = useSelector(selectTheme);
  const theme = useTheme();

  return (
    <IconButton onClick={changeTheme}>
      {currentTheme === "dark" ? (
        <LightMode
          sx={{
            color:
              currentTheme === "dark"
                ? theme.palette.bgColor.light
                : theme.palette.bgColor.dark,
          }}
        />
      ) : (
        <DarkMode
          sx={{
            color:
              currentTheme === "dark"
                ? theme.palette.bgColor.light
                : theme.palette.bgColor.dark,
          }}
        />
      )}
    </IconButton>
  );
};
