import CandleStickChart from "components/trade/chart";
import React from "react";

const Trade = () => {
  const assetName = "verdant";
  const klineInterval = "1m";
  return (
    <CandleStickChart assetName={assetName} klineInterval={klineInterval} />
  );
};

export default Trade;
