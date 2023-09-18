import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Auth = ({ title, sublink, sublinkText, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        height: "100vh",
        width: "100vw",
        color: "white.primary",
      }}
    >
      <Typography>{title}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography>New here? </Typography>
        <Typography component={Link} to={sublink}>
          {sublinkText}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "0.3rem",
        }}
      >
        <Typography variant="caption">© 2023 Verdant</Typography>
      </Box>
    </Box>
  );
};

export default Auth;
