import { Box, Button, Divider, Typography } from "@mui/material";
import RegisterForm from "components/forms/models/register";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "redux/features/user/userSlice";
import getGoogleOAuthUrl from "utils/googleOAuthUrl";

const Register = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "100vh",
      }}
    >
      <Typography>Sign Up</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
        }}
      >
        <Typography>Already have an account? </Typography>
        <Typography component={Link} to="/login">
          Log in
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <RegisterForm />
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            color: "black",
            fontSize: "0.7rem",
          }}
        >
          OR
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
              width: "19rem",
              height: "3rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                backgroundColor: "white",
              }}
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="google logo"
                width={45}
                style={{
                  position: "absolute",
                  left: 2,
                  backgroundColor: "white",
                  padding: "0.5rem",
                }}
              />
            </Box>
            <Typography
              variant="button"
              sx={{
                position: "absolute",
                right: 30,
              }}
            >
              Continue with google
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "0.3rem",
        }}
      >
        <Typography variant="caption">
          By signing up, you agree to our
        </Typography>
        <Typography variant="caption" component={Link} to="/terms-of-service">
          Terms of Service
        </Typography>
        <Typography variant="caption">and</Typography>
        <Typography variant="caption" component={Link} to="privacy-policy">
          Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
