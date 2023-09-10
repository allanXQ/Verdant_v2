import { Box, Button, Divider, Typography, styled } from "@mui/material";
import RegisterForm from "components/forms/models/register";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "redux/features/user/userSlice";
import getGoogleOAuthUrl from "utils/googleOAuthUrl";

const StyledDivider = styled(Divider)({
  width: "100%",
});

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
        // flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        // width: "100vw",
      }}
    >
      <RegisterForm />
      <Box>
        <Divider
          // orientation="vertical"
          // flexItem
          sx={{
            // height: "100%",
            color: "black",
            // width: "0.5rem",
          }}
        />
      </Box>

      <Box>
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
  );
};

export default Register;
