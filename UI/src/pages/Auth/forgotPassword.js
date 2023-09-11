import { Box, Typography } from "@mui/material";
import ForgotPasswordForm from "components/forms/models/forgotPassword";

const ForgotPassword = () => {
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
      <Typography>Forgot Password</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
        }}
      >
        <Typography>Enter email to reset password </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <ForgotPasswordForm />
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

export default ForgotPassword;
