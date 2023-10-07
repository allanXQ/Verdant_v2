const { Button, Typography, useTheme } = require("@mui/material");

const MuiButton = (props) => {
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

export default MuiButton;
