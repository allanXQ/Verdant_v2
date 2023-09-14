import { Box } from "@mui/material";
import React, { useReducer } from "react";
import CandleStickChart from "./chart";
import RangePicker from "./rangePicker";
import { Buy, Sell } from "./modals/trade";

const MainChart = () => {
  const assetName = "verdant";
  const klineInterval = "1h";
  const initialState = {
    buy: false,
    sell: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "buy":
        return { ...state, buy: true };
      case "sell":
        return { ...state, sell: true };
      case "close":
        return { ...state, buy: false, sell: false };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Box
      sx={{
        backgroundColor: "#253248",
        mx: "auto",
        width: "98%",
        position: "relative",
      }}
    >
      <RangePicker dispatch={dispatch} />
      <CandleStickChart assetName={assetName} klineInterval={klineInterval} />
      <Buy state={state} dispatch={dispatch} />
      <Sell state={state} dispatch={dispatch} />
    </Box>
  );
};

export default MainChart;
