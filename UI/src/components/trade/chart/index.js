import { Box } from "@mui/material";
import React from "react";
import CandleStickChart from "./chart";
import RangePicker from "./rangePicker";

const MainChart = () => {
  const assetName = "verdant";
  const klineInterval = "1h";
  return (
    <Box
      sx={{
        backgroundColor: "#253248",
        mx: "auto",
        width: "98%",
        height: 20,
      }}
    >
      <RangePicker />
      <CandleStickChart assetName={assetName} klineInterval={klineInterval} />
    </Box>
  );
};

export default MainChart;
