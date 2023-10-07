import { Box, Button, Typography } from "@mui/material";
import MuiButton from "components/common/Button";
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
        <MuiButton
          variant="contained"
          onClick={() => navigate(buttons[0].path)}
          content={buttons[0].name}
        />
        <MuiButton
          variant="contained"
          onClick={() => navigate(buttons[1].path)}
          content={buttons[1].name}
        />
      </Box>
    </Box>
  );
};
