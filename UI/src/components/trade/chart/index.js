import { Box } from "@mui/material";
import React from "react";
import CandleStickChart from "./chart";

const MainChart = () => {
  const assetName = "verdant";
  const klineInterval = "1m";
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CandleStickChart assetName={assetName} klineInterval={klineInterval} />
    </Box>
  );
};

export default MainChart;
