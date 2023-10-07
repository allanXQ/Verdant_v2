import { Box, Typography, Divider, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import getGoogleOAuthUrl from "utils/googleOAuthUrl";

const GoogleSignup = () => {
  return (
    <>
      <Divider
        variant="middle"
        sx={{
          color: "white.primary",
          fontSize: "0.8rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="bodyRegularBold"> OR</Typography>
      </Divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          href={getGoogleOAuthUrl()}
          sx={{
            position: "relative",
            width: "20rem",
            height: "3rem",
            borderRadius: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <img
              src="img/google.png"
              alt="google logo"
              width={45}
              style={{
                position: "absolute",
                left: 2,
                backgroundColor: "white",
                borderRadius: "2rem",
                padding: "0.5rem",
              }}
            />
          </Box>
          <Typography
            variant="bodyRegularBold"
            sx={{
              // position: "absolute",
              // right: 20,
              textTransform: "none",
            }}
          >
            Continue With Google
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export const Auth = ({ title, sublink, children, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        height: "100vh",
        // width: "100vw",
        color: "white.primary",
        overflowX: "hidden",
        ...sx,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography variant="bodyRegular">{sublink.text}</Typography>
        <Typography
          component={Link}
          to={sublink.pathname}
          variant="bodyRegularBold"
          color="primary"
        >
          {sublink.sublinkText}
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
        <GoogleSignup />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "0.3rem",
        }}
      >
        <Typography variant="bodySmallBold">© 2023 Verdant</Typography>
      </Box>
    </Box>
  );
};

export default Auth;
