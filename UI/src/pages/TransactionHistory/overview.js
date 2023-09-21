import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Overview = ({ userData, buttons }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        maxWidth: "95%",
      }}
    >
      <Box>
        <Typography variant="subtitle1">{userData?.name}</Typography>
        <Typography variant="h6">KSH {userData?.accountBalance}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={() => navigate(buttons[0].path)}>
          {buttons[0].name}
        </Button>
        <Button variant="contained" onClick={() => navigate(buttons[1].path)}>
          {buttons[1].name}
        </Button>
      </Box>
    </Box>
  );
};
