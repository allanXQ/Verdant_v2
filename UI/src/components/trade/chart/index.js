import { Box, useTheme } from "@mui/material";
import React, { useReducer } from "react";
import CandleStickChart from "./chart";
import RangePicker from "./rangePicker";
import { Buy, Sell } from "./modals/trade";
import { selectTheme } from "redux/features/app/configSlice";
import { useSelector } from "react-redux";

const MainChart = () => {
  const theme = useTheme();
  const currentTheme = useSelector(selectTheme);
  const formWidth = "17rem";

  return (
    <Box
      sx={{
        display: "flex",

        backgroundColor:
          currentTheme === "light"
            ? theme.palette.bgColor.light
            : theme.palette.bgColor.dark,
        // mx: "auto",
        width: "100%",
        height: `calc(100vh - 63px)`,
      }}
    >
      <Box>
        <RangePicker formWidth={formWidth} />
        <CandleStickChart formWidth={formWidth} />
      </Box>

      <Box
        sx={{
          zIndex: 1,
          overflowY: "scroll",
          width: `calc(${formWidth})`,
        }}
      >
        <Buy />
        <Sell />
      </Box>
    </Box>
  );
};

export default MainChart;
